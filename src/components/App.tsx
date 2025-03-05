import { Box, Container, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useReducer } from "react";
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
} from "../data.ts";
import { SetCheckboxes } from "./SetCheckboxes.tsx";
import { IntSlider } from "./IntSlider.tsx";

type Action =
  | { type: "updateExpansions"; payload: Set<Expansion> }
  | { type: "updateComplexities"; payload: Set<Complexity> }
  | { type: "updateNumPlayers"; payload: number }
  | { type: "updateSpiritsPerPlayer"; payload: number }
  | { type: "randomize"; payload: Spirit[][] };

interface State {
  numPlayers: number;
  spiritsPerPlayer: number;
  expansions: Set<Expansion>;
  complexities: Set<Complexity>;
  randomizedSet: Spirit[][] | null;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "updateExpansions":
      return { ...state, expansions: action.payload };
    case "updateComplexities":
      return { ...state, complexities: action.payload };
    case "updateNumPlayers":
      return { ...state, numPlayers: action.payload };
    case "updateSpiritsPerPlayer":
      return { ...state, spiritsPerPlayer: action.payload };
    case "randomize":
      return { ...state, randomizedSet: action.payload };
  }
}

export function App() {
  const [state, dispatch] = useReducer(reducer, {
    numPlayers: 2,
    spiritsPerPlayer: 3,
    expansions: new Set(allExpansions()),
    complexities: new Set(allComplexities()),
    randomizedSet: null,
  });

  const resultView =
    state.randomizedSet === null ? null : (
      <Result spirits={state.randomizedSet} />
    );

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
    dispatch({ type: "randomize", payload: chosen });
  };

  return (
    <Container maxWidth="md">
      <h1>Spirit Island Randomizer</h1>
      <IntSlider
        value={state.numPlayers}
        min={1}
        max={6}
        label="Number of players"
        actionType="updateNumPlayers"
        dispatch={dispatch}
      />
      <IntSlider
        value={state.spiritsPerPlayer}
        min={1}
        max={6}
        label="Spirits per player"
        actionType="updateSpiritsPerPlayer"
        dispatch={dispatch}
      />

      <Box sx={{ mt: 2 }}>
        <SetCheckboxes
          items={Object.entries(EXPANSIONS) as [Expansion, string][]}
          set={state.expansions}
          actionType="updateExpansions"
          label="Expansions"
          dispatch={dispatch}
        />
        <SetCheckboxes
          items={Object.entries(COMPLEXITIES) as [Complexity, string][]}
          set={state.complexities}
          actionType="updateComplexities"
          label="Complexities"
          dispatch={dispatch}
        />
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
