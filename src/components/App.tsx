import { Box, Container, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useReducer } from "react";
import { range, shuffle } from "remeda";
import { RandomizeResult } from "./RandomizeResult.tsx";
import { Complexity, Expansion, Spirit } from "../data.ts";
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
    expansions: new Set(Expansion.ALL),
    complexities: new Set(Complexity.ALL),
    randomizedSet: null,
  });

  const resultView =
    state.randomizedSet === null ? null : (
      <RandomizeResult spirits={state.randomizedSet} />
    );

  const filteredSpirits = Spirit.ALL.filter(
    (spirit) =>
      state.expansions.has(spirit.expansion) &&
      state.complexities.has(spirit.complexity),
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
          items={Expansion.ALL}
          set={state.expansions}
          actionType="updateExpansions"
          label="Expansions"
          dispatch={dispatch}
        />
        <SetCheckboxes
          items={Complexity.ALL}
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
