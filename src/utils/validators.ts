import { Generations, PokemonTypes } from "@/utils/types/pokemonTypes";

const isValidPokemonType = (type: PokemonTypes): boolean => {
  const validTypes = [
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
  ];

  return validTypes.includes(type);
};

const isValidGeneration = (generation: Generations): boolean => {
  const validGenerations = [
    "generation-i",
    "generation-ii",
    "generation-iii",
    "generation-iv",
    "generation-v",
    "generation-vi",
    "generation-vii",
    "generation-viii",
  ];

  return validGenerations.includes(generation);
};

export { isValidPokemonType, isValidGeneration };
