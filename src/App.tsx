import {
  Box,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Slider,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { type Dispatch, type JSX, useReducer } from "react";
import { range, shuffle } from "remeda";
import { Result } from "./RandomizeResult.tsx";
import {
  COMPLEXITIES,
  type Complexity,
  EXPANSIONS,
  type Expansion,
  SPIRITS,
  type Spirit,
  allComplexities,
  allExpansions,
} from "./data.ts";

interface UpdateSetAction<T, S extends string> {
  type: S;
  key: T;
  enabled: boolean;
}

interface UpdateIntAction<S extends string> {
  type: S;
  value: number;
}

type Action =
  | UpdateSetAction<Expansion, "updateExpansion">
  | UpdateSetAction<Complexity, "updateComplexity">
  | UpdateIntAction<"updateNumPlayers">
  | UpdateIntAction<"updateSpiritPerPlayer">
  | { type: "randomize"; chosen: Spirit[][] };

interface State {
  numPlayers: number;
  spiritsPerPlayer: number;
  expansions: Set<Expansion>;
  complexities: Set<Complexity>;
  randomizedSet: Spirit[][] | null;
}

function updateSet<T>(set: Set<T>, key: T, enabled: boolean): Set<T> {
  const newSet = new Set(set);
  if (enabled) {
    newSet.add(key);
  } else {
    newSet.delete(key);
  }
  return newSet;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "updateExpansion":
      return {
        ...state,
        expansions: updateSet(state.expansions, action.key, action.enabled),
      };
    case "updateComplexity":
      return {
        ...state,
        complexities: updateSet(state.complexities, action.key, action.enabled),
      };
    case "updateNumPlayers":
      return { ...state, numPlayers: action.value };
    case "updateSpiritPerPlayer":
      return { ...state, spiritsPerPlayer: action.value };
    case "randomize":
      return { ...state, randomizedSet: action.chosen };
  }
}

function createCheckboxes<T extends string, S extends string>(
  items: [T, string][],
  state: Set<T>,
  actionType: S,
  label: string,
  dispatch: Dispatch<UpdateSetAction<T, S>>,
): JSX.Element {
  const checkboxes = items.map(([id, label]) => {
    const checkbox = (
      <Checkbox
        checked={state.has(id)}
        onChange={(e) => {
          dispatch({ type: actionType, key: id, enabled: e.target.checked });
        }}
        name={id}
      />
    );
    return <FormControlLabel key={id} control={checkbox} label={label} />;
  });

  return (
    <FormControl>
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>{checkboxes}</FormGroup>
    </FormControl>
  );
}

function createSlider<S extends string>(
  value: number,
  min: number,
  max: number,
  actionType: S,
  label: string,
  dispatch: Dispatch<UpdateIntAction<S>>,
): JSX.Element {
  return (
    <FormControl fullWidth={true}>
      <FormLabel component="legend">{label}</FormLabel>
      <Slider
        value={value}
        onChange={(_, value) =>
          dispatch({ type: actionType, value: value as number })
        }
        min={min}
        max={max}
        step={null}
        marks={range(min, max + 1).map((i) => ({
          value: i,
          label: i.toString(),
        }))}
      />
    </FormControl>
  );
}

export function App() {
  const [state, dispatch] = useReducer(reducer, {
    numPlayers: 2,
    spiritsPerPlayer: 3,
    expansions: new Set(allExpansions()),
    complexities: new Set(allComplexities()),
    randomizedSet: null,
  });

  const expansionCheckboxes = createCheckboxes(
    Object.entries(EXPANSIONS) as [Expansion, string][],
    state.expansions,
    "updateExpansion",
    "Expansions",
    dispatch,
  );
  const complexityCheckboxes = createCheckboxes(
    Object.entries(COMPLEXITIES) as [Complexity, string][],
    state.complexities,
    "updateComplexity",
    "Complexities",
    dispatch,
  );

  const playersSlider = createSlider(
    state.numPlayers,
    1,
    6,
    "updateNumPlayers",
    "Number of players",
    dispatch,
  );
  const spiritsSlider = createSlider(
    state.spiritsPerPlayer,
    1,
    6,
    "updateSpiritPerPlayer",
    "Spirits per player",
    dispatch,
  );

  const resultView = state.randomizedSet === null ? null : <Result spirits={state.randomizedSet} />;

  const filteredSpirits = Object.keys(SPIRITS).filter(
    (spirit) =>
      state.expansions.has(SPIRITS[spirit].expansion) &&
      state.complexities.has(SPIRITS[spirit].complexity),
  );
  const enoughSpirits =
    filteredSpirits.length >= state.numPlayers * state.spiritsPerPlayer;
  const onRandomize = () => {
    const shuffledSpirits = shuffle(filteredSpirits);
    const chosen = range(0, state.numPlayers).map((i) =>
      shuffledSpirits.slice(
        i * state.spiritsPerPlayer,
        (i + 1) * state.spiritsPerPlayer,
      ),
    );
    dispatch({ type: "randomize", chosen });
  };

  return (
    <Container maxWidth="md">
      <h1>Spirit Island Randomizer</h1>
      {playersSlider}
      {spiritsSlider}
      <Box sx={{ mt: 2 }}>
        {expansionCheckboxes}
        {complexityCheckboxes}
      </Box>
      <Button
        onClick={onRandomize}
        disabled={!enoughSpirits}
        variant="contained"
        sx={{ mt: 2 }}
      >
        Randomize
      </Button>
      {enoughSpirits ? null : (
        <Typography color="error">Not enough spirits available</Typography>
      )}
      {resultView}
    </Container>
  );
}
