/**
 * Nombres de las regiones en base a la generación de los pokemones.
 * @constant
 * @example POKEMON_GENERATIONS[generation-i] => "1era. Kanto"
 */
const POKEMON_GENERATIONS_LABELS: Record<string, string> = {
  "generation-i": "1era. Kanto",
  "generation-ii": "2da. Johto",
  "generation-iii": "3era. Hoenn",
  "generation-iv": "4ta. Sinnoh",
  "generation-v": "5ta. Teselia",
  "generation-vi": "6ta. Kalos",
  "generation-vii": "7ma. Alola",
  "generation-viii": "8va. Galar",
  "generation-ix": "9na. Hisui",
};

/**
 * Lista de generaciones de pokemones.
 * @constant
 * @example POKEMON_GENERATIONS[0] => "generation-i"
 */
const POKEMON_GENERATIONS: string[] = [
  "generation-i",
  "generation-ii",
  "generation-iii",
  "generation-iv",
  "generation-v",
  "generation-vi",
  "generation-vii",
  "generation-viii",
  "generation-ix",
];

export { POKEMON_GENERATIONS, POKEMON_GENERATIONS_LABELS };
