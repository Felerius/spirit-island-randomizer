import { Add, Delete } from "@mui/icons-material";
import {
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputAdornment,
  OutlinedInput,
  Stack,
} from "@mui/material";
import type { Dispatch, ReactNode } from "react";

export interface Player {
  id: string;
  name?: string;
}

interface PlayerNamesProps {
  players: Player[];
  dispatch: Dispatch<UpdatePlayersAction>;
}

export interface UpdatePlayersAction {
  type: "updatePlayers";
  payload: Player[];
}

export function PlayerNames({
  players,
  dispatch,
}: PlayerNamesProps): ReactNode {
  const textBoxes = players.map((player, index) => {
    const deleteButton = (
      <InputAdornment position="end">
        <IconButton
          aria-label="Delete"
          edge="end"
          disabled={players.length <= 1}
          tabIndex={-1}
          onClick={() => {
            players.splice(index, 1);
            dispatch({ type: "updatePlayers", payload: players });
          }}
        >
          <Delete />
        </IconButton>
      </InputAdornment>
    );

    return (
      <FormControl
        key={player.id}
        variant="filled"
        hiddenLabel={true}
        aria-label="Player name"
      >
        <FilledInput
          value={player.name}
          placeholder={`Player name ${index + 1}`}
          endAdornment={deleteButton}
          onChange={(event) => {
            players[index].name = event.target.value;
            dispatch({ type: "updatePlayers", payload: players });
          }}
        />
      </FormControl>
    );
  });

  const addPlayer = () => {
    players.push({ id: crypto.randomUUID() });
    dispatch({ type: "updatePlayers", payload: players });
  };

  return (
    <Stack>
      <FormLabel sx={{ mb: 1 }}>Players</FormLabel>
      {textBoxes}
      <Button onClick={addPlayer} startIcon={<Add />}>
        Add player
      </Button>
    </Stack>
  );
}
