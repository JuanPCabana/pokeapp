interface PokemonQuery {
  count: number;
  next: string;
  previous: string;
  results: { name: string; url: string }[];
}

export type { PokemonQuery };