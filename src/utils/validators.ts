import { Generations, PokemonTypes } from "@/utils/types/pokemonTypes";
import { POKEMON_GENERATIONS, POKEMON_TYPES } from "./constants";

const isValidPokemonType = (type: PokemonTypes): boolean => {
  return POKEMON_TYPES.includes(type);
};

const isValidGeneration = (generation: Generations): boolean => {
  return POKEMON_GENERATIONS.includes(generation);
};

export { isValidPokemonType, isValidGeneration };
