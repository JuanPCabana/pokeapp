import { Generations, PokemonTypes } from "@/utils/types/pokemonTypes";
import { POKEMON_GENERATIONS, POKEMON_TYPES } from "./constants";

/**
 * Description
 * @param type: Tipo de pokemon
 * @returns  Si el tipo de pokemon es valido
 */
const isValidPokemonType = (type: PokemonTypes): boolean => {
  return POKEMON_TYPES.includes(type);
};

/**
 * Description
 * @param generation: Generacion de pokemon
 * @returns Si la generacion de pokemon es valida
 */
const isValidGeneration = (generation: Generations): boolean => {
  return POKEMON_GENERATIONS.includes(generation);
};

export { isValidPokemonType, isValidGeneration };
