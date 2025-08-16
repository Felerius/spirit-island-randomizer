import * as z from "zod/mini";
import madnessImage from "$assets/aspects/Madness.webp";
import pandemoniumImage from "$assets/aspects/Pandemonium.webp";
import reachImage from "$assets/aspects/Reach.webp";
import resilienceImage from "$assets/aspects/Resilience.webp";
import sunshineImage from "$assets/aspects/Sunshine.webp";
import windImage from "$assets/aspects/Wind.webp";
import type { ExpansionId } from "./expansions";
import type { SpiritId } from "./spirits";

export type RelativeComplexity = "lower" | "equal" | "higher";

export interface Aspect {
  name: string;
  spirit: SpiritId;
  expansion: ExpansionId;
  relativeComplexity: RelativeComplexity;
  imageUrl?: string;
  wikiTitle: string;
}

export type AspectId = keyof typeof ASPECTS_RAW;

const ASPECTS_RAW = {
  pandemonium: {
    name: "Pandemonium",
    spirit: "lightnings",
    imageUrl: pandemoniumImage,
    expansion: "jagged-earth",
    relativeComplexity: "higher",
    wikiTitle: "Pandemonium",
  },
  wind: {
    name: "Wind",
    spirit: "lightnings",
    imageUrl: windImage,
    expansion: "jagged-earth",
    relativeComplexity: "higher",
    wikiTitle: "Wind",
  },
  sparking: {
    name: "Sparking",
    spirit: "lightnings",
    expansion: "nature-incarnate",
    relativeComplexity: "higher",
    wikiTitle: "Sparking",
  },
  immense: {
    name: "Immense",
    spirit: "lightnings",
    expansion: "feather-flame",
    relativeComplexity: "higher",
    wikiTitle: "Immense",
  },
  sunshine: {
    name: "Sunshine",
    spirit: "river",
    imageUrl: sunshineImage,
    expansion: "jagged-earth",
    relativeComplexity: "higher",
    wikiTitle: "Sunshine",
  },
  haven: {
    name: "Haven",
    spirit: "river",
    expansion: "nature-incarnate",
    relativeComplexity: "higher",
    wikiTitle: "Haven",
  },
  travel: {
    name: "Travel",
    spirit: "river",
    expansion: "feather-flame",
    relativeComplexity: "higher",
    wikiTitle: "Travel",
  },
  madness: {
    name: "Madness",
    spirit: "shadows",
    imageUrl: madnessImage,
    expansion: "jagged-earth",
    relativeComplexity: "higher",
    wikiTitle: "Madness",
  },
  reach: {
    name: "Reach",
    spirit: "shadows",
    imageUrl: reachImage,
    expansion: "jagged-earth",
    relativeComplexity: "lower",
    wikiTitle: "Reach",
  },
  "dark-fire": {
    name: "Dark Fire",
    spirit: "shadows",
    expansion: "nature-incarnate",
    relativeComplexity: "higher",
    wikiTitle: "Dark_Fire",
  },
  foreboding: {
    name: "Foreboding",
    spirit: "shadows",
    expansion: "feather-flame",
    relativeComplexity: "higher",
    wikiTitle: "Foreboding",
  },
  amorphous: {
    name: "Amorphous",
    spirit: "shadows",
    expansion: "feather-flame",
    relativeComplexity: "higher",
    wikiTitle: "Amorphous",
  },
  resilience: {
    name: "Resilience",
    spirit: "vital",
    imageUrl: resilienceImage,
    expansion: "jagged-earth",
    relativeComplexity: "equal",
    wikiTitle: "Resilience",
  },
  nourishing: {
    name: "Nourishing",
    spirit: "vital",
    expansion: "nature-incarnate",
    relativeComplexity: "higher",
    wikiTitle: "Nourishing",
  },
  might: {
    name: "Might",
    spirit: "vital",
    expansion: "feather-flame",
    relativeComplexity: "higher",
    wikiTitle: "Might",
  },
  tangles: {
    name: "Tangles",
    spirit: "spread",
    expansion: "nature-incarnate",
    relativeComplexity: "higher",
    wikiTitle: "Tangles",
  },
  regrowth: {
    name: "Regrowth",
    spirit: "spread",
    expansion: "nature-incarnate",
    relativeComplexity: "higher",
    wikiTitle: "Regrowth",
  },
  warrior: {
    name: "Warrior",
    spirit: "thunderspeaker",
    expansion: "nature-incarnate",
    relativeComplexity: "higher",
    wikiTitle: "Warrior",
  },
  tactician: {
    name: "Tactician",
    spirit: "thunderspeaker",
    expansion: "nature-incarnate",
    relativeComplexity: "equal",
    wikiTitle: "Tactician",
  },
  violence: {
    name: "Violence",
    spirit: "bringer",
    expansion: "nature-incarnate",
    relativeComplexity: "higher",
    wikiTitle: "Violence",
  },
  enticing: {
    name: "Enticing",
    spirit: "bringer",
    expansion: "nature-incarnate",
    relativeComplexity: "equal",
    wikiTitle: "Enticing",
  },
  deeps: {
    name: "Deeps",
    spirit: "oceans",
    expansion: "nature-incarnate",
    relativeComplexity: "higher",
    wikiTitle: "Deeps",
  },
  "spreading-hostility": {
    name: "Spreading Hostility",
    spirit: "keeper",
    expansion: "nature-incarnate",
    relativeComplexity: "higher",
    wikiTitle: "Spreading_Hostility",
  },
  unconstrained: {
    name: "Unconstrained",
    spirit: "fangs",
    expansion: "nature-incarnate",
    relativeComplexity: "lower",
    wikiTitle: "Unconstrained",
  },
  encircle: {
    name: "Encircle",
    spirit: "fangs",
    expansion: "nature-incarnate",
    relativeComplexity: "equal",
    wikiTitle: "Encircle",
  },
  transforming: {
    name: "Transforming",
    spirit: "heart",
    expansion: "nature-incarnate",
    relativeComplexity: "higher",
    wikiTitle: "Transforming",
  },
  locus: {
    name: "Locus",
    spirit: "serpent",
    expansion: "nature-incarnate",
    relativeComplexity: "higher",
    wikiTitle: "Locus",
  },
  lair: {
    name: "Lair",
    spirit: "lure",
    expansion: "nature-incarnate",
    relativeComplexity: "higher",
    wikiTitle: "Lair",
  },
  mentor: {
    name: "Mentor",
    spirit: "shifting",
    expansion: "nature-incarnate",
    relativeComplexity: "higher",
    wikiTitle: "Mentor",
  },
  intensify: {
    name: "Intensify",
    spirit: "shifting",
    expansion: "nature-incarnate",
    relativeComplexity: "higher",
    wikiTitle: "Intensify",
  },
  stranded: {
    name: "Stranded",
    spirit: "shroud",
    expansion: "nature-incarnate",
    relativeComplexity: "lower",
    wikiTitle: "Stranded",
  },
} as const;

export const ASPECTS: Record<AspectId, Aspect> = ASPECTS_RAW;
export const ASPECT_IDS = Object.keys(ASPECTS) as AspectId[];
export const ASPECT_SCHEMA = z.enum([ASPECT_IDS[0], ...ASPECT_IDS.slice(1)]);
