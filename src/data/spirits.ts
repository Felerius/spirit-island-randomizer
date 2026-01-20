import * as z from "zod/mini";
import spreadImage from "$assets/spirits/A_Spread_of_Rampant_Green.webp";
import breathImage from "$assets/spirits/Breath_of_Darkness_Down_Your_Spine.webp";
import bringerImage from "$assets/spirits/Bringer_of_Dreams_and_Nightmares.webp";
import dancesImage from "$assets/spirits/Dances_Up_Earthquakes.webp";
import devouringImage from "$assets/spirits/Devouring_Teeth_Lurk_Underfoot.webp";
import downpourImage from "$assets/spirits/Downpour_Drenches_the_World.webp";
import behemothImage from "$assets/spirits/Ember-Eyed_Behemoth.webp";
import eyesImage from "$assets/spirits/Eyes_Watch_from_the_Trees.webp";
import mudImage from "$assets/spirits/Fathomless_Mud_of_the_Swamp.webp";
import finderImage from "$assets/spirits/Finder_of_Paths_Unseen.webp";
import fracturedImage from "$assets/spirits/Fractured_Days_Split_the_Sky.webp";
import tricksterImage from "$assets/spirits/Grinning_Trickster_Stirs_Up_Trouble.webp";
import heartImage from "$assets/spirits/Heart_of_the_Wildfire.webp";
import hearthImage from "$assets/spirits/Hearth-Vigil.webp";
import keeperImage from "$assets/spirits/Keeper_of_the_Forbidden_Wilds.webp";
import lightningsImage from "$assets/spirits/Lightning's_Swift_Strike.webp";
import lureImage from "$assets/spirits/Lure_of_the_Deep_Wilderness.webp";
import manyMindsImage from "$assets/spirits/Many_Minds_Move_as_One.webp";
import oceansImage from "$assets/spirits/Ocean's_Hungry_Grasp.webp";
import gazeImage from "$assets/spirits/Relentless_Gaze_of_the_Sun.webp";
import heatImage from "$assets/spirits/Rising_Heat_of_Stone_and_Sand.webp";
import riverImage from "$assets/spirits/River_Surges_in_Sunlight.webp";
import serpentImage from "$assets/spirits/Serpent_Slumbering_Beneath_the_Island.webp";
import shadowsImage from "$assets/spirits/Shadows_Flicker_Like_Flame.webp";
import fangsImage from "$assets/spirits/Sharp_Fangs_Behind_the_Leaves.webp";
import shiftingImage from "$assets/spirits/Shifting_Memory_of_Ages.webp";
import shroudImage from "$assets/spirits/Shroud_of_Silent_Mist.webp";
import starlightImage from "$assets/spirits/Starlight_Seeks_Its_Form.webp";
import stonesImage from "$assets/spirits/Stone's_Unyielding_Defiance.webp";
import whirlwindImage from "$assets/spirits/Sun-Bright_Whirlwind.webp";
import thunderspeakerImage from "$assets/spirits/Thunderspeaker.webp";
import toweringImage from "$assets/spirits/Towering_Roots_of_the_Jungle.webp";
import vengeanceImage from "$assets/spirits/Vengeance_as_a_Burning_Plague.webp";
import vitalImage from "$assets/spirits/Vital_Strength_of_the_Earth.webp";
import volcanoImage from "$assets/spirits/Volcano_Looming_High.webp";
import wanderingImage from "$assets/spirits/Wandering_Voice_Keens_Delirium.webp";
import woundedImage from "$assets/spirits/Wounded_Waters_Bleeding.webp";
import { ASPECT_IDS, ASPECTS, type AspectId } from "./aspects";
import type { ComplexityId } from "./complexities";
import type { ExpansionId } from "./expansions";

export interface Spirit {
  name: string;
  imageUrl: string;
  expansion: ExpansionId;
  complexity: ComplexityId;
  wikiTitle: string;
  aspects: AspectId[];
}

function spirit(data: Omit<Spirit, "aspects">): Spirit {
  return { ...data, aspects: [] };
}

export type SpiritId = keyof typeof SPIRITS_RAW;

const SPIRITS_RAW = {
  lightnings: spirit({
    name: "Lightning's Swift Strike",
    imageUrl: lightningsImage,
    expansion: "base",
    complexity: "low",
    wikiTitle: "Lightning%27s_Swift_Strike",
  }),
  river: spirit({
    name: "River Surges in Sunlight",
    imageUrl: riverImage,
    expansion: "base",
    complexity: "low",
    wikiTitle: "River_Surges_in_Sunlight",
  }),
  shadows: spirit({
    name: "Shadows Flicker Like Flame",
    imageUrl: shadowsImage,
    expansion: "base",
    complexity: "low",
    wikiTitle: "Shadows_Flicker_Like_Flame",
  }),
  vital: spirit({
    name: "Vital Strength of the Earth",
    imageUrl: vitalImage,
    expansion: "base",
    complexity: "low",
    wikiTitle: "Vital_Strength_of_the_Earth",
  }),
  spread: spirit({
    name: "A Spread of Rampant Green",
    imageUrl: spreadImage,
    expansion: "base",
    complexity: "moderate",
    wikiTitle: "A_Spread_of_Rampant_Green",
  }),
  thunderspeaker: spirit({
    name: "Thunderspeaker",
    imageUrl: thunderspeakerImage,
    expansion: "base",
    complexity: "moderate",
    wikiTitle: "Thunderspeaker",
  }),
  bringer: spirit({
    name: "Bringer of Dreams and Nightmares",
    imageUrl: bringerImage,
    expansion: "base",
    complexity: "high",
    wikiTitle: "Bringer_of_Dreams_and_Nightmares",
  }),
  oceans: spirit({
    name: "Ocean's Hungry Grasp",
    imageUrl: oceansImage,
    expansion: "base",
    complexity: "high",
    wikiTitle: "Ocean%27s_Hungry_Grasp",
  }),
  keeper: spirit({
    name: "Keeper of the Forbidden Wilds",
    imageUrl: keeperImage,
    expansion: "branch-claw",
    complexity: "moderate",
    wikiTitle: "Keeper_of_the_Forbidden_Wilds",
  }),
  fangs: spirit({
    name: "Sharp Fangs Behind the Leaves",
    imageUrl: fangsImage,
    expansion: "branch-claw",
    complexity: "moderate",
    wikiTitle: "Sharp_Fangs_Behind_the_Leaves",
  }),
  heart: spirit({
    name: "Heart of the Wildfire",
    imageUrl: heartImage,
    expansion: "feather-flame",
    complexity: "high",
    wikiTitle: "Heart_of_the_Wildfire",
  }),
  serpent: spirit({
    name: "Serpent Slumbering Beneath the Island",
    imageUrl: serpentImage,
    expansion: "feather-flame",
    complexity: "high",
    wikiTitle: "Serpent_Slumbering_Beneath_the_Island",
  }),
  trickster: spirit({
    name: "Grinning Trickster Stirs Up Trouble",
    imageUrl: tricksterImage,
    expansion: "jagged-earth",
    complexity: "moderate",
    wikiTitle: "Grinning_Trickster_Stirs_Up_Trouble",
  }),
  lure: spirit({
    name: "Lure of the Deep Wilderness",
    imageUrl: lureImage,
    expansion: "jagged-earth",
    complexity: "moderate",
    wikiTitle: "Lure_of_the_Deep_Wilderness",
  }),
  "many-minds": spirit({
    name: "Many Minds Move as One",
    imageUrl: manyMindsImage,
    expansion: "jagged-earth",
    complexity: "moderate",
    wikiTitle: "Many_Minds_Move_as_One",
  }),
  shifting: spirit({
    name: "Shifting Memory of Ages",
    imageUrl: shiftingImage,
    expansion: "jagged-earth",
    complexity: "moderate",
    wikiTitle: "Shifting_Memory_of_Ages",
  }),
  stones: spirit({
    name: "Stone's Unyielding Defiance",
    imageUrl: stonesImage,
    expansion: "jagged-earth",
    complexity: "moderate",
    wikiTitle: "Stone%27s_Unyielding_Defiance",
  }),
  volcano: spirit({
    name: "Volcano Looming High",
    imageUrl: volcanoImage,
    expansion: "jagged-earth",
    complexity: "moderate",
    wikiTitle: "Volcano_Looming_High",
  }),
  shroud: spirit({
    name: "Shroud of Silent Mist",
    imageUrl: shroudImage,
    expansion: "jagged-earth",
    complexity: "high",
    wikiTitle: "Shroud_of_Silent_Mist",
  }),
  vengeance: spirit({
    name: "Vengeance as a Burning Plague",
    imageUrl: vengeanceImage,
    expansion: "jagged-earth",
    complexity: "high",
    wikiTitle: "Vengeance_as_a_Burning_Plague",
  }),
  fractured: spirit({
    name: "Fractured Days Split the Sky",
    imageUrl: fracturedImage,
    expansion: "jagged-earth",
    complexity: "very-high",
    wikiTitle: "Fractured_Days_Split_the_Sky",
  }),
  starlight: spirit({
    name: "Starlight Seeks Its Form",
    imageUrl: starlightImage,
    expansion: "jagged-earth",
    complexity: "very-high",
    wikiTitle: "Starlight_Seeks_Its_Form",
  }),
  downpour: spirit({
    name: "Downpour Drenches the World",
    imageUrl: downpourImage,
    expansion: "feather-flame",
    complexity: "high",
    wikiTitle: "Downpour_Drenches_the_World",
  }),
  finder: spirit({
    name: "Finder of Paths Unseen",
    imageUrl: finderImage,
    expansion: "feather-flame",
    complexity: "very-high",
    wikiTitle: "Finder_of_Paths_Unseen",
  }),
  devouring: spirit({
    name: "Devouring Teeth Lurk Underfoot",
    imageUrl: devouringImage,
    expansion: "horizons",
    complexity: "low",
    wikiTitle: "Devouring_Teeth_Lurk_Underfoot",
  }),
  eyes: spirit({
    name: "Eyes Watch from the Trees",
    imageUrl: eyesImage,
    expansion: "horizons",
    complexity: "low",
    wikiTitle: "Eyes_Watch_from_the_Trees",
  }),
  mud: spirit({
    name: "Fathomless Mud of the Swamp",
    imageUrl: mudImage,
    expansion: "horizons",
    complexity: "low",
    wikiTitle: "Fathomless_Mud_of_the_Swamp",
  }),
  heat: spirit({
    name: "Rising Heat of Stone and Sand",
    imageUrl: heatImage,
    expansion: "horizons",
    complexity: "low",
    wikiTitle: "Rising_Heat_of_Stone_and_Sand",
  }),
  whirlwind: spirit({
    name: "Sun-Bright Whirlwind",
    imageUrl: whirlwindImage,
    expansion: "horizons",
    complexity: "low",
    wikiTitle: "Sun-Bright_Whirlwind",
  }),
  behemoth: spirit({
    name: "Ember-Eyed Behemoth",
    imageUrl: behemothImage,
    expansion: "nature-incarnate",
    complexity: "moderate",
    wikiTitle: "Ember-Eyed_Behemoth",
  }),
  hearth: spirit({
    name: "Hearth-Vigil",
    imageUrl: hearthImage,
    expansion: "nature-incarnate",
    complexity: "moderate",
    wikiTitle: "Hearth-Vigil",
  }),
  towering: spirit({
    name: "Towering Roots of the Jungle",
    imageUrl: toweringImage,
    expansion: "nature-incarnate",
    complexity: "moderate",
    wikiTitle: "Towering_Roots_of_the_Jungle",
  }),
  breath: spirit({
    name: "Breath of Darkness Down Your Spine",
    imageUrl: breathImage,
    expansion: "nature-incarnate",
    complexity: "high",
    wikiTitle: "Breath_of_Darkness_Down_Your_Spine",
  }),
  gaze: spirit({
    name: "Relentless Gaze of the Sun",
    imageUrl: gazeImage,
    expansion: "nature-incarnate",
    complexity: "high",
    wikiTitle: "Relentless_Gaze_of_the_Sun",
  }),
  wandering: spirit({
    name: "Wandering Voice Keens Delirium",
    imageUrl: wanderingImage,
    expansion: "nature-incarnate",
    complexity: "high",
    wikiTitle: "Wandering_Voice_Keens_Delirium",
  }),
  wounded: spirit({
    name: "Wounded Waters Bleeding",
    imageUrl: woundedImage,
    expansion: "nature-incarnate",
    complexity: "high",
    wikiTitle: "Wounded_Waters_Bleeding",
  }),
  dances: spirit({
    name: "Dances Up Earthquakes",
    imageUrl: dancesImage,
    expansion: "nature-incarnate",
    complexity: "very-high",
    wikiTitle: "Dances_Up_Earthquakes",
  }),
} as const;

export const SPIRITS: Record<SpiritId, Spirit> = SPIRITS_RAW;
for (const id of ASPECT_IDS) {
  SPIRITS[ASPECTS[id].spirit].aspects.push(id);
}

const SPIRIT_IDS = Object.keys(SPIRITS) as SpiritId[];
export const SPIRIT_SCHEMA = z.enum(SPIRIT_IDS);

export function availableSpirits(
  expansions: Set<ExpansionId>,
  complexities: Set<ComplexityId>,
): SpiritId[] {
  return SPIRIT_IDS.filter((id) => {
    const { expansion, complexity } = SPIRITS[id];
    return expansions.has(expansion) && complexities.has(complexity);
  });
}
