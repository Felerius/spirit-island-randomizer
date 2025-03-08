import {
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { type ReactNode, useReducer } from "react";
import { range, sample, shuffle } from "remeda";
import { type ChosenSpirit, RandomizeResult } from "./RandomizeResult.tsx";
import { Complexity, Expansion, Spirit } from "../data.ts";
import { SetCheckboxes } from "./SetCheckboxes.tsx";
import { IntSlider } from "./IntSlider.tsx";

type Action =
  | { type: "setExpansions"; payload: Set<Expansion> }
  | { type: "setComplexities"; payload: Set<Complexity> }
  | { type: "setNumPlayers"; payload: number }
  | { type: "setSpiritsPerPlayer"; payload: number }
  | { type: "setEnableAspects"; payload: boolean }
  | { type: "randomize"; payload: ChosenSpirit[][] };

interface State {
  numPlayers: number;
  spiritsPerPlayer: number;
  enableAspects: boolean;
  expansions: Set<Expansion>;
  complexities: Set<Complexity>;
  result?: ChosenSpirit[][];
}

function aspectChoices(spirit: Spirit, state: State): ChosenSpirit[] {
  const aspects = state.enableAspects
    ? [undefined, ...spirit.aspects]
    : [undefined];
  return aspects
    .filter((aspect) => {
      const complexity = aspect?.complexity ?? spirit.complexity;
      return (
        state.expansions.has(spirit.expansion) &&
        (aspect ? state.expansions.has(aspect.expansion) : true) &&
        state.complexities.has(complexity)
      );
    })
    .map((aspect) => ({ spirit, aspect }));
}

function chooseResult(state: State): ChosenSpirit[][] {
  const available = Spirit.ALL.flatMap((spirit) =>
    sample(aspectChoices(spirit, state), 1),
  );
  const shuffled = shuffle(available);
  return range(0, state.numPlayers).map((i) =>
    shuffled.slice(
      i * state.spiritsPerPlayer,
      (i + 1) * state.spiritsPerPlayer,
    ),
  );
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setExpansions":
      return { ...state, expansions: action.payload };
    case "setComplexities":
      return { ...state, complexities: action.payload };
    case "setNumPlayers":
      return { ...state, numPlayers: action.payload };
    case "setSpiritsPerPlayer":
      return { ...state, spiritsPerPlayer: action.payload };
    case "setEnableAspects":
      return { ...state, enableAspects: action.payload };
    case "randomize":
      return { ...state, result: action.payload };
  }
}

function expansionLabel(expansion: Expansion): ReactNode {
  const icon = expansion.icon ? (
    <SvgIcon
      fontSize="inherit"
      component={expansion.icon}
      inheritViewBox={true}
    />
  ) : null;
  return (
    <Stack alignItems="center" direction="row" gap={1}>
      {icon}
      {expansion.name}
    </Stack>
  );
}

export function App() {
  const [state, dispatch] = useReducer(reducer, {
    numPlayers: 2,
    spiritsPerPlayer: 3,
    enableAspects: true,
    expansions: new Set(Expansion.ALL),
    complexities: new Set(Complexity.ALL),
  });

  const availableSpirits = Spirit.ALL.filter(
    (spirit) => aspectChoices(spirit, state).length > 0,
  ).length;
  const enoughSpirits =
    availableSpirits >= state.numPlayers * state.spiritsPerPlayer;

  const resultView =
    state.result === undefined ? null : (
      <RandomizeResult spirits={state.result} />
    );

  return (
    <Container maxWidth="md">
      <h1>Spirit Island Randomizer</h1>
      <IntSlider
        value={state.numPlayers}
        min={1}
        max={6}
        label="Number of players"
        actionType="setNumPlayers"
        dispatch={dispatch}
      />
      <IntSlider
        value={state.spiritsPerPlayer}
        min={1}
        max={6}
        label="Spirits per player"
        actionType="setSpiritsPerPlayer"
        dispatch={dispatch}
      />

      <Stack
        direction="row"
        gap={2}
        sx={{ mt: 2, flexWrap: "wrap", justifyContent: "space-between" }}
      >
        <SetCheckboxes
          items={Expansion.ALL}
          set={state.expansions}
          actionType="setExpansions"
          label="Expansions"
          itemLabel={expansionLabel}
          dispatch={dispatch}
        />
        <SetCheckboxes
          items={Complexity.ALL}
          set={state.complexities}
          actionType="setComplexities"
          label="Complexities"
          itemLabel={(complexity) => complexity.name}
          dispatch={dispatch}
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Options</FormLabel>
          <FormGroup>
            <FormControlLabel
              label="Enable Aspects"
              control={
                <Checkbox
                  checked={state.enableAspects}
                  onChange={(e) =>
                    dispatch({
                      type: "setEnableAspects",
                      payload: e.target.checked,
                    })
                  }
                />
              }
            />
          </FormGroup>
        </FormControl>
      </Stack>

      <Button
        onClick={() => {
          dispatch({ type: "randomize", payload: chooseResult(state) });
        }}
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
