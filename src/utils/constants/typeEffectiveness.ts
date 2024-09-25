import { PokemonTypes } from "../types/pokemonTypes";

interface TypeEffectivenessTyping {
  [key: string]: {
    [key: string]: {
      x0: PokemonTypes[];
      half: PokemonTypes[];
      x2: PokemonTypes[];
    };
  };
}

/**
 * Efectividad de los tipos de pokemon.
 * @example
 * console.log(TYPE_EFFECTIVENESS['fire']) => { defendingDamage: { x0: [], half: ['fire', 'grass', 'bug', 'ice', 'steel', 'fairy'], x2: ['water', 'rock', 'ground'] }, attackingDamage: { x0: [], half: ['fire', 'water', 'rock', 'dragon'], x2: ['grass', 'ice', 'bug', 'steel'] } }
 */
export const TYPE_EFFECTIVENESS: TypeEffectivenessTyping = {
  fire: {
    defendingDamage: {
      x0: [],
      half: ["fire", "grass", "bug", "ice", "steel", "fairy"],
      x2: ["water", "rock", "ground"],
    },
    attackingDamage: {
      x0: [],
      half: ["fire", "water", "rock", "dragon"],
      x2: ["grass", "ice", "bug", "steel"],
    },
  },
  grass: {
    defendingDamage: {
      x0: [],
      half: ["water", "grass", "electric", "ground"],
      x2: ["fire", "poison", "bug", "flying", "ice"],
    },
    attackingDamage: {
      x0: [],
      half: ["fire", "grass", "dragon", "poison", "bug", "flying", "steel"],
      x2: ["water", "rock", "ground"],
    },
  },
  normal: {
    defendingDamage: {
      x0: ["ghost"],
      half: [],
      x2: ["fighting"],
    },
    attackingDamage: {
      x0: ["ghost"],
      half: ["rock", "steel"],
      x2: [],
    },
  },
  psychic: {
    defendingDamage: {
      x0: [],
      half: ["fighting", "psychic"],
      x2: ["bug", "ghost", "dark"],
    },
    attackingDamage: {
      x0: ["dark"],
      half: ["steel", "psychic"],
      x2: ["fighting", "poison"],
    },
  },
  fighting: {
    defendingDamage: {
      x0: [],
      half: ["bug", "rock", "dark"],
      x2: ["flying", "psychic", "fairy"],
    },
    attackingDamage: {
      x0: ["ghost"],
      half: ["poison", "flying", "psychic", "bug", "fairy"],
      x2: ["normal", "ice", "rock", "dark", "steel"],
    },
  },
  ground: {
    defendingDamage: {
      x0: ["electric"],
      half: ["poison", "rock"],
      x2: ["water", "grass", "ice"],
    },
    attackingDamage: {
      x0: ["flying"],
      half: ["grass", "bug"],
      x2: ["fire", "electric", "poison", "rock", "steel"],
    },
  },
  flying: {
    defendingDamage: {
      x0: ["ground"],
      half: ["fighting", "bug", "grass"],
      x2: ["electric", "ice", "rock"],
    },
    attackingDamage: {
      x0: [],
      half: ["electric", "rock", "steel"],
      x2: ["grass", "fighting", "bug"],
    },
  },
  ice: {
    defendingDamage: {
      x0: [],
      half: ["ice"],
      x2: ["fire", "fighting", "rock", "steel"],
    },
    attackingDamage: {
      x0: [],
      half: ["fire", "water", "ice", "steel"],
      x2: ["grass", "dragon", "ground", "flying"],
    },
  },
  dark: {
    defendingDamage: {
      x0: ["psychic"],
      half: ["ghost", "dark"],
      x2: ["fighting", "bug", "fairy"],
    },
    attackingDamage: {
      x0: [],
      half: ["fighting", "dark", "fairy"],
      x2: ["psychic", "ghost"],
    },
  },
  water: {
    defendingDamage: {
      x0: [],
      half: ["water", "fire", "ice", "steel"],
      x2: ["electric", "grass"],
    },
    attackingDamage: {
      x0: [],
      half: ["water", "grass", "dragon"],
      x2: ["fire", "ground", "rock"],
    },
  },
  electric: {
    defendingDamage: {
      x0: [],
      half: ["electric", "flying", "steel"],
      x2: ["ground"],
    },
    attackingDamage: {
      x0: ["ground"],
      half: ["electric", "grass", "dragon"],
      x2: ["water", "flying"],
    },
  },
  rock: {
    defendingDamage: {
      x0: [],
      half: ["normal", "fire", "poison", "flying"],
      x2: ["water", "grass", "fighting", "ground", "steel"],
    },
    attackingDamage: {
      x0: [],
      half: ["fighting", "ground", "steel"],
      x2: ["fire", "ice", "flying", "bug"],
    },
  },
  dragon: {
    defendingDamage: {
      x0: [],
      half: ["fire", "water", "grass", "electric"],
      x2: ["ice", "dragon", "fairy"],
    },
    attackingDamage: {
      x0: ["fairy"],
      half: ["steel"],
      x2: ["dragon"],
    },
  },
  poison: {
    defendingDamage: {
      x0: [],
      half: ["grass", "fighting", "poison", "bug", "fairy"],
      x2: ["ground", "psychic"],
    },
    attackingDamage: {
      x0: ["steel"],
      half: ["poison", "ground", "rock", "ghost"],
      x2: ["grass", "fairy"],
    },
  },
  bug: {
    defendingDamage: {
      x0: [],
      half: ["grass", "fighting", "ground"],
      x2: ["fire", "flying", "rock"],
    },
    attackingDamage: {
      x0: [],
      half: ["fighting", "flying", "poison", "ghost", "steel", "fire", "fairy"],
      x2: ["grass", "psychic", "dark"],
    },
  },
  ghost: {
    defendingDamage: {
      x0: ["normal", "fighting"],
      half: ["poison", "bug"],
      x2: ["ghost", "dark"],
    },
    attackingDamage: {
      x0: ["normal"],
      half: ["dark"],
      x2: ["psychic", "ghost"],
    },
  },
  steel: {
    defendingDamage: {
      x0: ["poison"],
      half: [
        "grass",
        "normal",
        "rock",
        "psychic",
        "dragon",
        "bug",
        "flying",
        "ice",
        "steel",
        "fairy",
      ],
      x2: ["fire", "fighting", "ground"],
    },
    attackingDamage: {
      x0: [],
      half: ["fire", "water", "electric", "steel"],
      x2: ["ice", "rock", "fairy"],
    },
  },
  fairy: {
    defendingDamage: {
      x0: ["dragon"],
      half: ["fighting", "bug", "dark"],
      x2: ["poison", "steel"],
    },
    attackingDamage: {
      x0: [],
      half: ["fire", "poison", "steel"],
      x2: ["fighting", "dragon", "dark"],
    },
  },
};
