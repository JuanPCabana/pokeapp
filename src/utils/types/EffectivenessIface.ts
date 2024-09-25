import { PokemonTypes } from "./text";

interface EffectivenessIface {
  x0dmg: PokemonTypes[];
  halfdmg: PokemonTypes[];
  x2dmg: PokemonTypes[];
  quarterdmg: PokemonTypes[];
  x4dmg: PokemonTypes[];
  [key: string]: PokemonTypes[];
}

export type { EffectivenessIface };
