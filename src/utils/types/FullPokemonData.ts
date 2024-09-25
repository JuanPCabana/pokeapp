import { ShortStatsIface } from "./auxiliars";
import { Pokemon } from "./Pokemon";
import { EffectivenessIface } from "./EffectivenessIface";

interface FullPokemonData {
  id: string;
  name: string;
  img: string;
  shinyImg: string;
  stats: ShortStatsIface[];
  types: string[];
  generation: string;
  habitat: string;
  nationalPokedexNumber: string;
  evolutionChain: Pokemon[];
  resistances: EffectivenessIface;
  eggGroups: string[];
}

export type { FullPokemonData };
