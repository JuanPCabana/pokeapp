import { TYPE_EFFECTIVENESS } from "./constants";

function getEffectiveness(types: string[] | undefined): {
  strongAgainst2x: string[];
  weakAgainst2x: string[];
  weakAgainst4x: string[];
} {
  const strongAgainst: Record<string, number> = {};
  const weakAgainst: Record<string, number> = {};

  if (!types) {
    return {
      strongAgainst2x: [],
      weakAgainst2x: [],
      weakAgainst4x: [],
    };
  }

  // Iteramos sobre los tipos del Pokémon
  types.forEach((type) => {
    if (TYPE_EFFECTIVENESS[type]) {
      // Sumamos fortalezas
      TYPE_EFFECTIVENESS[type].strongAgainst.forEach((strongType) => {
        strongAgainst[strongType] = (strongAgainst[strongType] || 0) + 1;
      });

      // Sumamos debilidades
      TYPE_EFFECTIVENESS[type].weakAgainst.forEach((weakType) => {
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
