/** @jsxImportSource @emotion/react */
import { ASPECTS, ASPECT_SCHEMA, type AspectId } from "$data/aspects";
import { SPIRITS, SPIRIT_SCHEMA, type SpiritId } from "$data/spirits";
import { css } from "@emotion/react";
import { Grid, Stack } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { Fragment, type ReactNode } from "react";
import z from "zod";

const chosenSpiritSchema = z.tuple([SPIRIT_SCHEMA, z.nullable(ASPECT_SCHEMA)]);
const searchSchema = z.object({
  spirits: z.array(z.tuple([z.string(), z.array(chosenSpiritSchema)])),
});

export const Route = createFileRoute("/result")({
  validateSearch: searchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();

  const rows = search.spirits.map(([playerName, spirits]) => {
    const spiritDisplays = spirits.map(([spirit, aspect]) => (
      <ChosenSpirit key={spirit} spirit={spirit} aspect={aspect} />
    ));
    return (
      <Fragment key={playerName}>
        <h1 css={css`text-align: center;`}>{playerName}</h1>
        <Grid container spacing={2} justifyContent="space-evenly">
          {spiritDisplays}
        </Grid>
      </Fragment>
    );
  });

  return <Stack>{rows}</Stack>;
}

function ChosenSpirit(props: {
  spirit: SpiritId;
  aspect: AspectId | null;
}): ReactNode {
  const { spirit, aspect } = props;
  const spiritData = SPIRITS[spirit];
  const aspectData = aspect ? ASPECTS[aspect] : null;
  const imageUrl = aspectData?.imageUrl ?? spiritData.imageUrl;

  const titleCss = css`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    text-align: center;
    height: 3em;`;
  const imageCss = css`
    width: 100%;
    height: 100%;
    // Most common aspect ratio among spirit images
    aspect-ratio: 600 / 388;
    object-fit: contain;`;

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Stack alignItems="center" height={"100%"}>
        <h3 css={titleCss}>
          <span>
            <a href={wikiUrl(spiritData.wikiTitle)}>{spiritData.name}</a>
            {aspectData && (
              <>
                {" ("}
                <a href={wikiUrl(aspectData.wikiTitle)}>{aspectData.name}</a>
                {")"}
              </>
            )}
          </span>
        </h3>
        <img src={imageUrl} alt={spiritData.name} css={imageCss} />
      </Stack>
    </Grid>
  );
}

function wikiUrl(title: string): string {
  return `https://spiritislandwiki.com/index.php?title=${title}`;
}
