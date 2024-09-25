import { POKEMON_TYPES_TRADUCTION } from "./constants";

/**
 * Description
 * @param value: Valor de tipo de pokemon
 * @returns  Nombre del tipo de pokemon
 */
const getPokemonTypeName = (value: string): string => {
  return POKEMON_TYPES_TRADUCTION[value];
};
export default getPokemonTypeName;
