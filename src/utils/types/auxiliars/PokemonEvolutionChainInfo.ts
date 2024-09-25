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

export type { PokemonEvolutionChainInfo };