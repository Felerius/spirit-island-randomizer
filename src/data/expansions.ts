import type { FunctionComponent } from "react";
import * as z from "zod/mini";
import BaseGameIcon from "$assets/expansions/basegame.svg?react";
import BranchClawIcon from "$assets/expansions/branchclaw.svg?react";
import FeatherFlameIcon from "$assets/expansions/featherflame.svg?react";
import HorizonsIcon from "$assets/expansions/horizons.svg?react";
import JaggedEarthIcon from "$assets/expansions/jaggedearth.svg?react";
import NatureIncarnateIcon from "$assets/expansions/natureincarnate.svg?react";

export interface Expansion {
  name: string;
  icon: FunctionComponent;
}

export type ExpansionId = keyof typeof EXPANSIONS_RAW;

const EXPANSIONS_RAW = {
  base: { name: "Base Game", icon: BaseGameIcon },
  "branch-claw": { name: "Branch & Claw", icon: BranchClawIcon },
  "feather-flame": { name: "Feather & Flame", icon: FeatherFlameIcon },
  horizons: { name: "Horizons of Spirit Island", icon: HorizonsIcon },
  "jagged-earth": { name: "Jagged Earth", icon: JaggedEarthIcon },
  "nature-incarnate": { name: "Nature Incarnate", icon: NatureIncarnateIcon },
} as const;

export const EXPANSIONS: Record<ExpansionId, Expansion> = EXPANSIONS_RAW;
export const EXPANSION_IDS = Object.keys(EXPANSIONS) as ExpansionId[];

export const EXPANSION_SCHEMA = z.enum(EXPANSION_IDS);
