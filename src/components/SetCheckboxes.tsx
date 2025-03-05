import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import type { ChangeEvent, Dispatch, JSX } from "react";

interface Props<T, S extends string> {
  items: [T, string][];
  set: Set<T>;
  actionType: S;
  label: string;
  dispatch: Dispatch<{ type: S; payload: Set<T> }>;
}

export function SetCheckboxes<T extends string, S extends string>(
  props: Props<T, S>,
): JSX.Element {
  const { items, set, actionType, label, dispatch } = props;

  const checkboxes = items.map(([id, label]) => {
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newSet = new Set(set);
      if (e.target.checked) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      dispatch({ type: actionType, payload: newSet });
    };
    const checkbox = (
      <Checkbox checked={set.has(id)} onChange={onChange} name={id} />
    );
    return <FormControlLabel key={id} control={checkbox} label={label} />;
  });

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>{checkboxes}</FormGroup>
    </FormControl>
  );
}
