/**
 * @description Constante con la traducción de los tipos de pokemon.
 * @example
 * console.log(POKEMON_TYPES_TRADUCTION['bug']) => 'Bicho'
 */
const POKEMON_TYPES_TRADUCTION: Record<string, string> = {
  bug: "Bicho",
  dark: "Siniestro",
  dragon: "Dragón",
  electric: "Eléctrico",
  fairy: "Hada",
  fighting: "Lucha",
  fire: "Fuego",
  flying: "Volador",
  ghost: "Fantasma",
  grass: "Planta",
  ground: "Tierra",
  ice: "Hielo",
  normal: "Normal",
  poison: "Veneno",
  psychic: "Psíquico",
  rock: "Roca",
  steel: "Acero",
  water: "Agua",
};

/**
 * @description Lista con los tipos de pokemon.
 * @example
 * console.log(POKEMON_TYPES[0]) => 'bug'
 */
const POKEMON_TYPES = [
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water",
];

export { POKEMON_TYPES_TRADUCTION, POKEMON_TYPES };
