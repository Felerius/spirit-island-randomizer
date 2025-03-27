import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import type { ChangeEvent, Dispatch, ReactNode } from "react";

interface SubsetCheckboxesProps<T extends string, I extends string> {
  items: I[];
  set: Set<I>;
  actionType: T;
  label: string;
  itemLabel: (id: I) => ReactNode;
  dispatch: Dispatch<{ type: T; payload: Set<I> }>;
}

export function SubsetCheckboxes<T extends string, I extends string>(
  props: SubsetCheckboxesProps<T, I>,
): ReactNode {
  const { items, set, actionType, label, itemLabel, dispatch } = props;
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
      <Checkbox checked={set.has(item)} onChange={onChange} name={item} />
    );
    return (
      <FormControlLabel key={item} control={checkbox} label={itemLabel(item)} />
    );
  });

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>{checkboxes}</FormGroup>
    </FormControl>
  );
}
