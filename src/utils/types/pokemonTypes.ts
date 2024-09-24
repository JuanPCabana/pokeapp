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
  stats: { base_stat: number; effort: number; stat: { name: string } }[];
  species: { url: string; name: string };
}

interface PokemonStatsIface {
  base_stat: number;
  effort: number;
  stat: { name: string };
}

interface PokemonTypeIface {
  type: { name: string };
}

interface PokedexIface {
  entry_number: number;
  pokedex: { name: string };
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
  id: string;
  name: string;
  url: string;
}

interface EvolutionTrigger {
  name: string;
  url: string;
}

interface EvolutionDetails {
  gender: number | null;
  held_item: string | null;
  item: string | null;
  known_move: string | null;
  known_move_type: string | null;
  location: string | null;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: boolean;
  party_species: string | null;
  party_type: string | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: string | null;
  trigger: EvolutionTrigger;
  turn_upside_down: boolean;
}

interface Species {
  name: string;
  url: string;
}

interface EvoChainIface {
  evolution_details: EvolutionDetails[];
  evolves_to: EvoChainIface[];
  is_baby: boolean;
  species: Species;
}

interface FullPokemonData {
  id: string;
  name: string;
  img: string;
  stats: {
    name: string;
    value: number;
    effort: number;
  }[];
  types: string[];
  generation: string;
  habitat: string;
  nationalPokedexNumber: string;
  evolutionChain: Pokemon[];
  resistances: EffectivenessIface;
  eggGroups: string[];
}

interface EffectivenessIface {
  x0dmg: PokemonTypes[];
  halfdmg: PokemonTypes[];
  x2dmg: PokemonTypes[];
  quarterdmg: PokemonTypes[];
  x4dmg: PokemonTypes[];
}

type PokemonTypes =
  | "normal"
  | "fighting"
  | "flying"
  | "poison"
  | "ground"
  | "rock"
  | "bug"
  | "ghost"
  | "steel"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "psychic"
  | "ice"
  | "dragon"
  | "dark"
  | "fairy"
  | "unknown"
  | "shadow";

type Generations =
  | "generation-i"
  | "generation-ii"
  | "generation-iii"
  | "generation-iv"
  | "generation-v"
  | "generation-vi"
  | "generation-vii"
  | "generation-viii";

export type {
  PokemonQuery,
  PokemonInfo,
  PokemonSpecieInfo,
  Pokemon,
  PokemonEvolutionChainInfo,
  PokemonStatsIface,
  PokemonTypeIface,
  PokedexIface,
  EvoChainIface,
  Species,
  FullPokemonData,
  PokemonTypes,
  Generations,
  EffectivenessIface,
};
