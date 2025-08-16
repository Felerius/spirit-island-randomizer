import * as z from "zod/mini";

export type ComplexityId = keyof typeof COMPLEXITIES_RAW;

const COMPLEXITIES_RAW = {
  low: "Low",
  moderate: "Moderate",
  high: "High",
  "very-high": "Very High",
} as const;

export const COMPLEXITIES: Record<ComplexityId, string> = COMPLEXITIES_RAW;
export const COMPLEXITY_IDS = Object.keys(COMPLEXITIES_RAW) as ComplexityId[];

export const COMPLEXITY_SCHEMA = z.enum([
  COMPLEXITY_IDS[0],
  ...COMPLEXITY_IDS.slice(1),
]);
