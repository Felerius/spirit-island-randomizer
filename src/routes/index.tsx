import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Slider,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { type Dispatch, type ReactNode, useReducer } from "react";
import { range } from "remeda";
import { ButtonLink } from "$components/ButtonLink";
import {
  type Player,
  PlayerNames,
  type UpdatePlayersAction,
} from "$components/PlayerNames";
import { SubsetCheckboxes } from "$components/SubsetCheckboxes";
import {
  COMPLEXITIES,
  COMPLEXITY_IDS,
  type ComplexityId,
} from "$data/complexities";
import { EXPANSION_IDS, EXPANSIONS, type ExpansionId } from "$data/expansions";
import { availableSpirits } from "$data/spirits";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [state, dispatch] = useReducer(reducer, {
    players: [{ id: crypto.randomUUID() }, { id: crypto.randomUUID() }],
    spiritsPerPlayer: 2,
    chooseAspects: true,
    expansions: new Set(EXPANSION_IDS),
    complexities: new Set(COMPLEXITY_IDS),
  });

  const players = state.players.map(
    ({ name }, index) => name ?? `Player ${index + 1}`,
  );
  const params = {
    ...state,
    expansions: Array.from(state.expansions),
    complexities: Array.from(state.complexities),
    players: players as [string, ...string[]],
  };

  const numMatching = availableSpirits(
    state.expansions,
    state.complexities,
  ).length;
  const numRequired = state.players.length * state.spiritsPerPlayer;
  const notEnoughSpirits = numMatching < numRequired;

  return (
    <Stack alignItems="center" sx={{ my: 2, width: "100%" }}>
      <Grid container spacing={3} sx={{ width: "100%" }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <PlayerNames players={state.players} dispatch={dispatch} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack spacing={2}>
            <SpiritsPerPlayer
              value={state.spiritsPerPlayer}
              dispatch={dispatch}
            />
            <Options state={state} dispatch={dispatch} />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <SubsetCheckboxes
            items={EXPANSION_IDS}
            set={state.expansions}
            actionType="updateExpansions"
            label="Expansions"
            itemLabel={(id) => <ExpansionLabel expansion={id} />}
            dispatch={dispatch}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <SubsetCheckboxes
            items={COMPLEXITY_IDS}
            set={state.complexities}
            actionType="updateComplexities"
            label="Complexities"
            itemLabel={(id) => COMPLEXITIES[id]}
            dispatch={dispatch}
          />
        </Grid>
      </Grid>
      <ButtonLink
        to="/randomize"
        search={params}
        disabled={notEnoughSpirits}
        variant="contained"
        sx={{ mt: 2 }}
      >
        Randomize
      </ButtonLink>
      {notEnoughSpirits && (
        <Typography color="error" sx={{ mt: 1 }}>
          Not enough spirits available
        </Typography>
      )}
    </Stack>
  );
}

function SpiritsPerPlayer({
  value,
  dispatch,
}: {
  value: number;
  dispatch: Dispatch<Action>;
}): ReactNode {
  const marks = range(1, 7).map((i) => ({ value: i, label: i.toString() }));
  return (
    <FormControl fullWidth>
      <FormLabel>
        Spirits per player
        <Slider
          value={value}
          min={1}
          max={6}
          step={null}
          marks={marks}
          onChange={(_, value) =>
            dispatch({
              type: "updateSpiritsPerPlayer",
              payload: value as number,
            })
          }
        />
      </FormLabel>
    </FormControl>
  );
}

function Options({
  state,
  dispatch,
}: {
  state: State;
  dispatch: Dispatch<Action>;
}): ReactNode {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Options</FormLabel>
      <FormGroup>
        <FormControlLabel
          label="Choose aspects"
          control={
            <Checkbox
              checked={state.chooseAspects}
              onChange={(e) =>
                dispatch({
                  type: "updateChooseAspects",
                  payload: e.target.checked,
                })
              }
            />
          }
        />
      </FormGroup>
    </FormControl>
  );
}

function ExpansionLabel({ expansion }: { expansion: ExpansionId }): ReactNode {
  const { name, icon } = EXPANSIONS[expansion];
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      {icon && <SvgIcon fontSize="inherit" component={icon} inheritViewBox />}
      {name}
    </Stack>
  );
}

interface State {
  players: Player[];
  spiritsPerPlayer: number;
  chooseAspects: boolean;
  expansions: Set<ExpansionId>;
  complexities: Set<ComplexityId>;
}

type Action =
  | UpdatePlayersAction
  | { type: "updateSpiritsPerPlayer"; payload: number }
  | { type: "updateChooseAspects"; payload: boolean }
  | { type: "updateExpansions"; payload: Set<ExpansionId> }
  | { type: "updateComplexities"; payload: Set<ComplexityId> };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "updatePlayers":
      return { ...state, players: action.payload };
    case "updateSpiritsPerPlayer":
      return { ...state, spiritsPerPlayer: action.payload };
    case "updateChooseAspects":
      return { ...state, chooseAspects: action.payload };
    case "updateExpansions":
      return { ...state, expansions: action.payload };
    case "updateComplexities":
      return { ...state, complexities: action.payload };
  }
}
