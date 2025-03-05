import { Stack, Tooltip } from "@mui/material";
import type { JSX } from "react";
import { COMPLEXITIES, SPIRITS, type Spirit } from "../data.ts";
import "./RandomizeResult.css";

interface Props {
  spirits: Spirit[][];
}

export function Result(props: Props): JSX.Element {
  const rows = props.spirits.map((spirits, i) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: Order of elements in this list has semantic meaning
    <div key={i}>
      <h2>Player {i + 1}</h2>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        {spirits.map((spirit) => {
          const data = SPIRITS[spirit];
          return (
            <Tooltip
              key={spirit}
              title={`${data.name} (${COMPLEXITIES[data.complexity]})`}
            >
              <a href={data.wikiLink}>
                <img className="spiritImage" src={data.image} alt={data.name} />
              </a>
            </Tooltip>
          );
        })}
      </Stack>
    </div>
  ));

  return <div>{rows}</div>;
}
