export const EXPANSIONS = {
  base: "Base Game",
  branchclaw: "Branch & Claw",
  jaggedearth: "Jagged Earth",
  featherflame: "Feather & Flame",
  natureincarnate: "Nature Incarnate",
  horizons: "Horizons of Spirit Island",
};

export type Expansion = keyof typeof EXPANSIONS;

export function allExpansions(): Expansion[] {
  return Object.keys(EXPANSIONS) as Expansion[];
}

export const COMPLEXITIES = {
  low: "Low",
  moderate: "Moderate",
  high: "High",
  veryhigh: "Very High",
};

export type Complexity = keyof typeof COMPLEXITIES;

export function allComplexities(): Complexity[] {
  return Object.keys(COMPLEXITIES) as Complexity[];
}

export interface SpiritData {
  name: string;
  image: string;
  expansion: Expansion;
  complexity: Complexity;
  wikiLink: string;
}

function spiritImage(stem: string): string {
  return new URL(`./assets/spirits/${stem}.webp`, import.meta.url).href;
}

export const SPIRITS: Record<string, SpiritData> = {
  lighgningsSwiftStrike: {
    name: "Lightning's Swift Strike",
    image: spiritImage("Lightning's_Swift_Strike"),
    expansion: "base",
    complexity: "low",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Lightning%27s_Swift_Strike",
  },
  riverSurges: {
    name: "River Surges in Sunlight",
    image: spiritImage("River_Surges_in_Sunlight"),
    expansion: "base",
    complexity: "low",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=River_Surges_in_Sunlight",
  },
  shadowsFlicker: {
    name: "Shadows Flicker Like Flame",
    image: spiritImage("Shadows_Flicker_Like_Flame"),
    expansion: "base",
    complexity: "low",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Shadows_Flicker_Like_Flame",
  },
  vitalStrength: {
    name: "Vital Strength of the Earth",
    image: spiritImage("Vital_Strength_of_the_Earth"),
    expansion: "base",
    complexity: "low",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Vital_Strength_of_the_Earth",
  },
  spread: {
    name: "A Spread of Rampant Green",
    image: spiritImage("A_Spread_of_Rampant_Green"),
    expansion: "base",
    complexity: "moderate",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=A_Spread_of_Rampant_Green",
  },
  thunderspeaker: {
    name: "Thunderspeaker",
    image: spiritImage("Thunderspeaker"),
    expansion: "base",
    complexity: "moderate",
    wikiLink: "https://spiritislandwiki.com/index.php?title=Thunderspeaker",
  },
  bringer: {
    name: "Bringer of Dreams and Nightmares",
    image: spiritImage("Bringer_of_Dreams_and_Nightmares"),
    expansion: "base",
    complexity: "high",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Bringer_of_Dreams_and_Nightmares",
  },
  oceans: {
    name: "Ocean's Hungry Grasp",
    image: spiritImage("Ocean's_Hungry_Grasp"),
    expansion: "base",
    complexity: "high",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Ocean%27s_Hungry_Grasp",
  },
  keeper: {
    name: "Keeper of the Forbidden Wilds",
    image: spiritImage("Keeper_of_the_Forbidden_Wilds"),
    expansion: "branchclaw",
    complexity: "moderate",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Keeper_of_the_Forbidden_Wilds",
  },
  sharpFangs: {
    name: "Sharp Fangs Behind the Leaves",
    image: spiritImage("Sharp_Fangs_Behind_the_Leaves"),
    expansion: "branchclaw",
    complexity: "moderate",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Sharp_Fangs_Behind_the_Leaves",
  },
  heartOfWildfire: {
    name: "Heart of the Wildfire",
    image: spiritImage("Heart_of_the_Wildfire"),
    expansion: "featherflame",
    complexity: "high",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Heart_of_the_Wildfire",
  },
  serpent: {
    name: "Serpent Slumbering Beneath the Island",
    image: spiritImage("Serpent_Slumbering_Beneath_the_Island"),
    expansion: "featherflame",
    complexity: "high",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Serpent_Slumbering_Beneath_the_Island",
  },
  grinningTrickster: {
    name: "Grinning Trickster Stirs Up Trouble",
    image: spiritImage("Grinning_Trickster_Stirs_Up_Trouble"),
    expansion: "jaggedearth",
    complexity: "moderate",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Grinning_Trickster_Stirs_Up_Trouble",
  },
  lure: {
    name: "Lure of the Deep Wilderness",
    image: spiritImage("Lure_of_the_Deep_Wilderness"),
    expansion: "jaggedearth",
    complexity: "moderate",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Lure_of_the_Deep_Wilderness",
  },
  manyMinds: {
    name: "Many Minds Move as One",
    image: spiritImage("Many_Minds_Move_as_One"),
    expansion: "jaggedearth",
    complexity: "moderate",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Many_Minds_Move_as_One",
  },
  shiftingMemory: {
    name: "Shifting Memory of Ages",
    image: spiritImage("Shifting_Memory_of_Ages"),
    expansion: "jaggedearth",
    complexity: "moderate",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Shifting_Memory_of_Ages",
  },
  stonesDefiance: {
    name: "Stone's Unyielding Defiance",
    image: spiritImage("Stone's_Unyielding_Defiance"),
    expansion: "jaggedearth",
    complexity: "moderate",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Stone%27s_Unyielding_Defiance",
  },
  volcano: {
    name: "Volcano Looming High",
    image: spiritImage("Volcano_Looming_High"),
    expansion: "jaggedearth",
    complexity: "moderate",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Volcano_Looming_High",
  },
  shroud: {
    name: "Shroud of Silent Mist",
    image: spiritImage("Shroud_of_Silent_Mist"),
    expansion: "jaggedearth",
    complexity: "high",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Shroud_of_Silent_Mist",
  },
  vengeance: {
    name: "Vengeance as a Burning Plague",
    image: spiritImage("Vengeance_as_a_Burning_Plague"),
    expansion: "jaggedearth",
    complexity: "high",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Vengeance_as_a_Burning_Plague",
  },
  fracturedDays: {
    name: "Fractured Days Split the Sky",
    image: spiritImage("Fractured_Days_Split_the_Sky"),
    expansion: "jaggedearth",
    complexity: "veryhigh",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Fractured_Days_Split_the_Sky",
  },
  starlight: {
    name: "Starlight Seeks Its Form",
    image: spiritImage("Starlight_Seeks_Its_Form"),
    expansion: "jaggedearth",
    complexity: "veryhigh",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Starlight_Seeks_Its_Form",
  },
  downpour: {
    name: "Downpour Drenches the World",
    image: spiritImage("Downpour_Drenches_the_World"),
    expansion: "featherflame",
    complexity: "high",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Downpour_Drenches_the_World",
  },
  finder: {
    name: "Finder of Paths Unseen",
    image: spiritImage("Finder_of_Paths_Unseen"),
    expansion: "featherflame",
    complexity: "veryhigh",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Finder_of_Paths_Unseen",
  },
  devouringTeeth: {
    name: "Devouring Teeth Lurk Underfoot",
    image: spiritImage("Devouring_Teeth_Lurk_Underfoot"),
    expansion: "horizons",
    complexity: "low",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Devouring_Teeth_Lurk_Underfoot",
  },
  eyesWatch: {
    name: "Eyes Watch from the Trees",
    image: spiritImage("Eyes_Watch_from_the_Trees"),
    expansion: "horizons",
    complexity: "low",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Eyes_Watch_from_the_Trees",
  },
  fathomlessMud: {
    name: "Fathomless Mud of the Swamp",
    image: spiritImage("Fathomless_Mud_of_the_Swamp"),
    expansion: "horizons",
    complexity: "low",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Fathomless_Mud_of_the_Swamp",
  },
  risingHeat: {
    name: "Rising Heat of Stone and Sand",
    image: spiritImage("Rising_Heat_of_Stone_and_Sand"),
    expansion: "horizons",
    complexity: "low",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Rising_Heat_of_Stone_and_Sand",
  },
  sunBright: {
    name: "Sun-Bright Whirlwind",
    image: spiritImage("Sun-Bright_Whirlwind"),
    expansion: "horizons",
    complexity: "low",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Sun-Bright_Whirlwind",
  },
  emberEyed: {
    name: "Ember-Eyed Behemoth",
    image: spiritImage("Ember-Eyed_Behemoth"),
    expansion: "natureincarnate",
    complexity: "moderate",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Ember-Eyed_Behemoth",
  },
  hearthVigil: {
    name: "Hearth-Vigil",
    image: spiritImage("Hearth-Vigil"),
    expansion: "natureincarnate",
    complexity: "moderate",
    wikiLink: "https://spiritislandwiki.com/index.php?title=Hearth-Vigil",
  },
  toweringRoots: {
    name: "Towering Roots of the Jungle",
    image: spiritImage("Towering_Roots_of_the_Jungle"),
    expansion: "natureincarnate",
    complexity: "moderate",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Towering_Roots_of_the_Jungle",
  },
  breath: {
    name: "Breath of Darkness Down Your Spine",
    image: spiritImage("Breath_of_Darkness_Down_Your_Spine"),
    expansion: "natureincarnate",
    complexity: "high",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Breath_of_Darkness_Down_Your_Spine",
  },
  relentlessGaze: {
    name: "Relentless Gaze of the Sun",
    image: spiritImage("Relentless_Gaze_of_the_Sun"),
    expansion: "natureincarnate",
    complexity: "high",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Relentless_Gaze_of_the_Sun",
  },
  wanderingVoices: {
    name: "Wandering Voice Keens Delirium",
    image: spiritImage("Wandering_Voice_Keens_Delirium"),
    expansion: "natureincarnate",
    complexity: "high",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Wandering_Voice_Keens_Delirium",
  },
  woundedWaters: {
    name: "Wounded Waters Bleeding",
    image: spiritImage("Wounded_Waters_Bleeding"),
    expansion: "natureincarnate",
    complexity: "high",
    wikiLink:
      "htps://spiritislandwiki.com/index.php?title=Wounded_Waters_Bleeding",
  },
  dancesUpEarthquakes: {
    name: "Dances Up Earthquakes",
    image: spiritImage("Dances_Up_Earthquakes"),
    expansion: "natureincarnate",
    complexity: "veryhigh",
    wikiLink:
      "https://spiritislandwiki.com/index.php?title=Dances_Up_Earthquakes",
  },
};

export type Spirit = keyof typeof SPIRITS;

export function allSpirits(): Spirit[] {
  return Object.keys(COMPLEXITIES) as Spirit[];
}
