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

export type { PokemonSpecieInfo };
