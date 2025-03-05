import { FormControl, FormLabel, Slider } from "@mui/material";
import type { Dispatch, JSX } from "react";
import { range } from "remeda";

interface Props<T extends string> {
  value: number;
  min: number;
  max: number;
  label: string;
  actionType: T;
  dispatch: Dispatch<{ type: T; payload: number }>;
}

export function IntSlider<T extends string>(props: Props<T>): JSX.Element {
  const { value, min, max, label, actionType, dispatch } = props;
  const marks = range(min, max + 1).map((i) => ({
    value: i,
    label: i.toString(),
  }));

  return (
    <FormControl fullWidth={true}>
      <FormLabel component="legend">{label}</FormLabel>
      <Slider
        value={value}
        min={min}
        max={max}
        step={null}
        marks={marks}
        onChange={(_, value) =>
          dispatch({ type: actionType, payload: value as number })
        }
      />
    </FormControl>
  );
}
