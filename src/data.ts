import SPIRIT_DATA from "./spirits.json";
import type { FunctionComponent } from "react";
import BranchClawIcon from "./assets/expansions/branchclaw.svg?react";
import JaggedEarthIcon from "./assets/expansions/jaggedearth.svg?react";
import FeatherFlameIcon from "./assets/expansions/featherflame.svg?react";
import NatureIncarnateIcon from "./assets/expansions/natureincarnate.svg?react";
import HorizonsIcon from "./assets/expansions/horizons.svg?react";

export class Expansion {
  id: string;
  name: string;
  icon?: FunctionComponent;

  constructor(id: string, name: string, icon?: FunctionComponent) {
    this.id = id;
    this.name = name;
    this.icon = icon;
  }

  static ALL = [
    new Expansion("base", "Base Game"),
    new Expansion("branchclaw", "Branch & Claw", BranchClawIcon),
    new Expansion("jaggedearth", "Jagged Earth", JaggedEarthIcon),
    new Expansion("featherflame", "Feather & Flame", FeatherFlameIcon),
    new Expansion("natureincarnate", "Nature Incarnate", NatureIncarnateIcon),
    new Expansion("horizons", "Horizons of Spirit Island", HorizonsIcon),
  ];

  static BY_ID = Object.fromEntries(
    Expansion.ALL.map((expansion) => [expansion.id, expansion]),
  );
}

export class Complexity {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  offset(relative: RelativeComplexity): Complexity {
    if (relative === "equal") {
      return this;
    }
    const index = Complexity.ALL.indexOf(this);
    const count = Complexity.ALL.length;
    const newIndex =
      relative === "higher"
        ? Math.min(index + 1, count - 1)
        : Math.max(index - 1, 0);
    return Complexity.ALL[newIndex];
  }

  static ALL = [
    new Complexity("low", "Low"),
    new Complexity("moderate", "Moderate"),
    new Complexity("high", "High"),
    new Complexity("veryhigh", "Very High"),
  ];

  static BY_ID = Object.fromEntries(
    Complexity.ALL.map((complexity) => [complexity.id, complexity]),
  );
}

export type RelativeComplexity = "equal" | "higher" | "lower";

interface SpiritJsonData {
  name: string;
  image: string;
  expansion: string;
  complexity: string;
  wikiTitle: string;
  aspects?: AspectJsonData[];
}

interface AspectJsonData {
  name: string;
  image?: string;
  expansion: string;
  relativeComplexity: string;
  wikiTitle: string;
}

function spiritImageLink(name: string): string {
  return new URL(`./assets/spirits/${name}.webp`, import.meta.url).href;
}

function wikiLink(title: string): string {
  return `https://spiritislandwiki.com/index.php?title=${title}`;
}

export class Aspect {
  name: string;
  imageLink?: string;
  expansion: Expansion;
  relativeComplexity: RelativeComplexity;
  complexity: Complexity;
  wikiLink: string;

  constructor(data: AspectJsonData, baseComplexity: Complexity) {
    this.name = data.name;
    this.imageLink = data.image ? spiritImageLink(data.image) : undefined;
    this.expansion = Expansion.BY_ID[data.expansion];
    this.relativeComplexity = data.relativeComplexity as RelativeComplexity;
    this.complexity = baseComplexity.offset(this.relativeComplexity);
    this.wikiLink = wikiLink(data.wikiTitle);
  }
}

export class Spirit {
  name: string;
  imageLink: string;
  expansion: Expansion;
  complexity: Complexity;
  wikiLink: string;
  aspects: Aspect[];

  constructor(data: SpiritJsonData) {
    this.name = data.name;
    this.imageLink = spiritImageLink(data.image);
    this.expansion = Expansion.BY_ID[data.expansion];
    this.complexity = Complexity.BY_ID[data.complexity];
    this.wikiLink = wikiLink(data.wikiTitle);
    this.aspects = (data.aspects ?? []).map(
      (aspectData) => new Aspect(aspectData, this.complexity),
    );
  }

  static ALL = SPIRIT_DATA.map((data) => new Spirit(data));
}
