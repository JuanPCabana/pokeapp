const typeEffectiveness: Record<
  string,
  { strongAgainst: string[]; weakAgainst: string[] }
> = {
  normal: {
    strongAgainst: [],
    weakAgainst: ["fighting"],
  },
  fire: {
    strongAgainst: ["grass", "bug", "ice", "steel"],
    weakAgainst: ["water", "rock", "ground"],
  },
  water: {
    strongAgainst: ["fire", "ground", "rock"],
    weakAgainst: ["electric", "grass"],
  },
  electric: {
    strongAgainst: ["water", "flying"],
    weakAgainst: ["ground"],
  },
  grass: {
    strongAgainst: ["water", "ground", "rock"],
    weakAgainst: ["fire", "ice", "poison", "flying", "bug"],
  },
  ice: {
    strongAgainst: ["grass", "ground", "flying", "dragon"],
    weakAgainst: ["fire", "fighting", "rock", "steel"],
  },
  fighting: {
    strongAgainst: ["normal", "ice", "rock", "dark", "steel"],
    weakAgainst: ["flying", "psychic", "fairy"],
  },
  poison: {
    strongAgainst: ["grass", "fairy"],
    weakAgainst: ["ground", "psychic"],
  },
  ground: {
    strongAgainst: ["fire", "electric", "poison", "rock", "steel"],
    weakAgainst: ["water", "ice", "grass"],
  },
  flying: {
    strongAgainst: ["grass", "fighting", "bug"],
    weakAgainst: ["electric", "ice", "rock"],
  },
  psychic: {
    strongAgainst: ["fighting", "poison"],
    weakAgainst: ["bug", "ghost", "dark"],
  },
  bug: {
    strongAgainst: ["grass", "psychic", "dark"],
    weakAgainst: ["fire", "flying", "rock"],
  },
  rock: {
    strongAgainst: ["fire", "ice", "flying", "bug"],
    weakAgainst: ["water", "grass", "fighting", "ground", "steel"],
  },
  ghost: {
    strongAgainst: ["psychic", "ghost"],
    weakAgainst: ["ghost", "dark"],
  },
  dragon: {
    strongAgainst: ["dragon"],
    weakAgainst: ["ice", "dragon", "fairy"],
  },
  dark: {
    strongAgainst: ["psychic", "ghost"],
    weakAgainst: ["fighting", "bug", "fairy"],
  },
  steel: {
    strongAgainst: ["ice", "rock", "fairy"],
    weakAgainst: ["fire", "fighting", "ground"],
  },
  fairy: {
    strongAgainst: ["fighting", "dragon", "dark"],
    weakAgainst: ["poison", "steel"],
  },
};

function getEffectiveness(types: string[]): {
  strongAgainst2x: string[];
  weakAgainst2x: string[];
  weakAgainst4x: string[];
} {
  const strongAgainst: Record<string, number> = {};
  const weakAgainst: Record<string, number> = {};

  // Iteramos sobre los tipos del Pokémon
  types.forEach((type) => {
    if (typeEffectiveness[type]) {
      // Sumamos fortalezas
      typeEffectiveness[type].strongAgainst.forEach((strongType) => {
        strongAgainst[strongType] = (strongAgainst[strongType] || 0) + 1;
      });

      // Sumamos debilidades
      typeEffectiveness[type].weakAgainst.forEach((weakType) => {
        weakAgainst[weakType] = (weakAgainst[weakType] || 0) + 1;
      });
    }
  });

  // Creamos las listas de tipos contra los que es fuerte (2x) y débil (2x o 4x)
  const strongAgainst2x = Object.keys(strongAgainst);
  const weakAgainst2x = Object.keys(weakAgainst).filter(
    (type) => weakAgainst[type] === 1
  );
  const weakAgainst4x = Object.keys(weakAgainst).filter(
    (type) => weakAgainst[type] >= 2
  );

  return {
    strongAgainst2x,
    weakAgainst2x,
    weakAgainst4x,
  };
}

export default getEffectiveness;
