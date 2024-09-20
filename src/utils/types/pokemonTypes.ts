interface PokemonQuery {
  count: number;
  next: string;
  previous: string;
  results: { name: string; url: string }[];
}

interface PokemonInfo {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
}

interface Pokemon {
  name: string;
  url: string;
}


export type { PokemonQuery, PokemonInfo, Pokemon };
