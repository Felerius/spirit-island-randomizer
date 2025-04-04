import type { AspectId } from "$data/aspects";
import { COMPLEXITY_IDS, COMPLEXITY_SCHEMA } from "$data/complexities";
import { EXPANSION_IDS, EXPANSION_SCHEMA } from "$data/expansions";
import { SPIRITS, type SpiritId, availableSpirits } from "$data/spirits";
import { Navigate, createFileRoute } from "@tanstack/react-router";
import { sample, shuffle } from "remeda";
import z from "zod";

const searchSchema = z.object({
  players: z.string().array().nonempty().catch(["Player 1", "Player 2"]),
  spiritsPerPlayer: z.number().int().min(1).catch(2),
  chooseAspects: z.boolean().catch(true),
  expansions: z.array(EXPANSION_SCHEMA).catch(EXPANSION_IDS),
  complexities: z.array(COMPLEXITY_SCHEMA).catch(COMPLEXITY_IDS),
});

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
