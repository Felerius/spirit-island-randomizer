import { Grid2, Tooltip } from "@mui/material";
import type { JSX } from "react";
import type { Aspect, Spirit } from "../data.ts";
import css from "./RandomizeResult.module.css";

export interface ChosenSpirit {
  spirit: Spirit;
  aspect?: Aspect;
}

interface Props {
  spirits: ChosenSpirit[][];
}

function AspectOverlay(props: { aspect: Aspect }): JSX.Element {
  const complexityClass =
    css[`aspect-complexity-${props.aspect.relativeComplexity}`];
  return (
    <a href={props.aspect.wikiLink}>
      <span className={`${css.aspectOverlay} ${complexityClass}`} />
    </a>
  );
}

export function RandomizeResult(props: Props): JSX.Element {
  const rows = props.spirits.map((spirits, i) => {
    const spiritImages = spirits.map((chosenSpirit) => {
      const { spirit, aspect } = chosenSpirit;
      const aspectOverlay = aspect ? <AspectOverlay aspect={aspect} /> : null;
      const image = aspect?.imageLink ?? spirit.imageLink;
      const complexity = aspect?.complexity ?? spirit.complexity;
      const title = aspect ? `${spirit.name}: ${aspect.name}` : spirit.name;
      return (
        <Grid2 key={spirit.name} size={{ xs: 12, sm: 6, md: 4 }}>
          <Tooltip title={`${title} (${complexity.name})`}>
            <div className={css.spiritContainer}>
              <a href={spirit.wikiLink}>
                <img src={image} alt={title} />
              </a>
              {aspectOverlay}
            </div>
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
