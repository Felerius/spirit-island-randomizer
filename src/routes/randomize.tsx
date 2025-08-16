import { createFileRoute, Navigate } from "@tanstack/react-router";
import { sample, shuffle } from "remeda";
import * as z from "zod/mini";
import type { AspectId } from "$data/aspects";
import { COMPLEXITY_IDS, COMPLEXITY_SCHEMA } from "$data/complexities";
import { EXPANSION_IDS, EXPANSION_SCHEMA } from "$data/expansions";
import { availableSpirits, SPIRITS, type SpiritId } from "$data/spirits";

const defaultSearchValues = {
  players: ["Player 1", "Player 2"],
  spiritsPerPlayer: 2,
  chooseAspects: true,
  expansions: EXPANSION_IDS,
  complexities: COMPLEXITY_IDS,
};
const searchSchema = z.catch(
  z.object({
    players: z.array(z.string()).check(z.minLength(1)),
    spiritsPerPlayer: z.int().check(z.minimum(1)),
    chooseAspects: z.boolean(),
    expansions: z.array(EXPANSION_SCHEMA),
    complexities: z.array(COMPLEXITY_SCHEMA),
  }),
  defaultSearchValues,
);

export const Route = createFileRoute("/randomize")({
  validateSearch: searchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const { players, spiritsPerPlayer, chooseAspects, expansions, complexities } =
    Route.useSearch();
  const available = availableSpirits(
    new Set(expansions),
    new Set(complexities),
  );
  const needed = players.length * spiritsPerPlayer;
  const chosen = shuffle(available)
    .slice(0, needed)
    .map((spirit) => {
      const { aspects } = SPIRITS[spirit];
      const choices = chooseAspects ? [null, ...aspects] : [null];
      const aspect = sample(choices, 1)[0];
      return [spirit, aspect] as [SpiritId, AspectId | null];
    });
  const byPlayer = players.map((player, i) => {
    const spirits = chosen.slice(
      i * spiritsPerPlayer,
      (i + 1) * spiritsPerPlayer,
    );
    return [player, spirits] as [string, [SpiritId, AspectId | null][]];
  });

  return <Navigate to="/result" replace search={{ spirits: byPlayer }} />;
}
