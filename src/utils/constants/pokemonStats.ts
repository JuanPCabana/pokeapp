interface PokemonStatsTraduction {
  hp: string;
  attack: string;
  defense: string;
  "special-attack": string;
  "special-defense": string;
  speed: string;
  [key: string]: string;
}

/**
 * Traducción de las estadísticas de los pokemones.
 * @example
 * console.log(POKEMON_STATS_TRADUCTION['hp']) => 'PS'
 */
const POKEMON_STATS_TRADUCTION: PokemonStatsTraduction = {
  hp: "PS",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "Ataque Especial",
  "special-defense": "Defensa Especial",
  speed: "Velocidad",
};

export { POKEMON_STATS_TRADUCTION };
