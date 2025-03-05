import { Grid2, Tooltip } from "@mui/material";
import type { JSX } from "react";
import { COMPLEXITIES, SPIRITS, type Spirit } from "../data.ts";
import "./RandomizeResult.css";

interface Props {
  spirits: Spirit[][];
}

export function RandomizeResult(props: Props): JSX.Element {
  const rows = props.spirits.map((spirits, i) => {
    const spiritImages = spirits.map((spirit) => {
      const data = SPIRITS[spirit];
      const complexity = COMPLEXITIES[data.complexity];

      return (
        <Grid2 key={spirit} size={{ xs: 12, sm: 6, md: 4 }}>
          <Tooltip title={`${data.name} (${complexity})`}>
            <a href={data.wikiLink}>
              <img className="spiritImage" src={data.image} alt={data.name} />
            </a>
          </Tooltip>
        </Grid2>
      );
    });

    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: Order of elements in this list has semantic meaning
      <div key={i}>
        <h2>Player {i + 1}</h2>
        <Grid2 container={true} spacing={2}>
          {spiritImages}
        </Grid2>
      </div>
    );
  });

  return <div>{rows}</div>;
}
