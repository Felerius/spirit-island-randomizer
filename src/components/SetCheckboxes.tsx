import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import type { ChangeEvent, Dispatch, JSX, ReactNode } from "react";

interface Props<T, S extends string> {
  items: T[];
  set: Set<T>;
  actionType: S;
  label: string;
  itemLabel: (item: T) => ReactNode;
  dispatch: Dispatch<{ type: S; payload: Set<T> }>;
}

export function SetCheckboxes<T extends { id: string }, S extends string>(
  props: Props<T, S>,
): JSX.Element {
  const { items, set, actionType, label, dispatch } = props;

  const checkboxes = items.map((item) => {
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newSet = new Set(set);
      if (e.target.checked) {
        newSet.add(item);
      } else {
        newSet.delete(item);
      }
      dispatch({ type: actionType, payload: newSet });
    };
    const checkbox = (
      <Checkbox checked={set.has(item)} onChange={onChange} name={item.id} />
    );
    return (
      <FormControlLabel
        key={item.id}
        control={checkbox}
        label={props.itemLabel(item)}
      />
    );
  });

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>{checkboxes}</FormGroup>
    </FormControl>
  );
}
