import { POKEMON_TYPES_TRADUCTION } from "./constants";

const getPokemonTypeName = (value: string): string => {
  return POKEMON_TYPES_TRADUCTION[value];
};
export default getPokemonTypeName;
