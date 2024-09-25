interface PokemonInfo {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: { front_default: string; front_shiny: string };
  stats: { base_stat: number; effort: number; stat: { name: string } }[];
  species: { url: string; name: string };
}

export type { PokemonInfo };