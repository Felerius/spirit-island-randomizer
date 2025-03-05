import SPIRIT_DATA from "./spirits.json";

export class Expansion {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  static ALL = [
    new Expansion("base", "Base Game"),
    new Expansion("branchclaw", "Branch & Claw"),
    new Expansion("jaggedearth", "Jagged Earth"),
    new Expansion("featherflame", "Feather & Flame"),
    new Expansion("natureincarnate", "Nature Incarnate"),
    new Expansion("horizons", "Horizons of Spirit Island"),
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

interface SpiritJsonData {
  name: string;
  image: string;
  expansion: string;
  complexity: string;
  wikiTitle: string;
}

export class Spirit {
  name: string;
  imageHref: string;
  expansion: Expansion;
  complexity: Complexity;
  wikiLink: string;

  constructor(data: SpiritJsonData) {
    const imagePath = `./assets/spirits/${data.image}.webp`;
    this.name = data.name;
    this.imageHref = new URL(imagePath, import.meta.url).href;
    this.expansion = Expansion.BY_ID[data.expansion];
    this.complexity = Complexity.BY_ID[data.complexity];
    this.wikiLink = `https://spiritislandwiki.com/index.php?title=${data.wikiTitle}`;
  }

  static ALL = SPIRIT_DATA.map((data) => new Spirit(data));
}
