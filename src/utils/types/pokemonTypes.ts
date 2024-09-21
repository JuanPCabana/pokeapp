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

interface PokemonSpecieInfo {
  generation: { name: string };
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
  genera: { genus: string; language: { name: string } }[];
  habitat: { name: string };
  color: { name: string };
  shape: { name: string };
  egg_groups: { name: string }[];
  evolution_chain: { url: string };
  varieties: { is_default: boolean; pokemon: { name: string; url: string } }[];
  pokedex_numbers: { entry_number: number; pokedex: { name: string } }[];
}

interface PokemonEvolutionChainInfo {
  chain: {
    species: { name: string; url: string }[];
    evolves_to: {
      species: { name: string; url: string }[];
      evolves_to: {
        species: { name: string; url: string }[];
      }[];
    }[];
  };
}

interface Pokemon {
  name: string;
  url: string;
}

export type {
  PokemonQuery,
  PokemonInfo,
  PokemonSpecieInfo,
  Pokemon,
  PokemonEvolutionChainInfo,
};
