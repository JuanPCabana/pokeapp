import { TYPE_EFFECTIVENESS } from "./constants";
import { EffectivenessIface, PokemonTypes } from "./types/pokemonTypes";

type Variants = "defending" | "attacking";

const getTypesEffectiveness = (
  types: string[] | undefined = [],
  variant: Variants
): EffectivenessIface => {
  const typesEffectiveness = [];

  const properties: Record<string, string> = {
    attacking: "attackingDamage",
    defending: "defendingDamage",
  };

  const property = properties[variant];

  for (const type of types) {
    const effectiveness = TYPE_EFFECTIVENESS[type];
    if (effectiveness) {
      typesEffectiveness.push(effectiveness);
    }
  }

  const x4dmg: PokemonTypes[] = [];
  let x2dmg: PokemonTypes[] = [];
  let halfdmg: PokemonTypes[] = [];
  const quarterdmg: PokemonTypes[] = [];
  const x0dmg: PokemonTypes[] = [];

  for (const type of typesEffectiveness) {
    const variantDamage = type[property];

    for (const innerType of variantDamage.x0) {
      x0dmg.push(innerType);
    }
    for (const innerType of variantDamage.half) {
      halfdmg.push(innerType);
    }
    for (const innerType of variantDamage.x2) {
      x2dmg.push(innerType);
    }
  }

  if (variant === "attacking") {
    return {
      x0dmg: x0dmg,
      halfdmg: halfdmg,
      x2dmg: x2dmg,
      quarterdmg: [],
      x4dmg: [],
    };
  }

  const halfTypesCount: Record<string, number> = {};
  let aux = [...halfdmg];

  aux.forEach((innerType) => {
    halfTypesCount[innerType] = (halfTypesCount[innerType] || 0) + 1;
    if (halfTypesCount[innerType] === 2) {
      halfdmg = halfdmg.filter((type) => type !== innerType);
      quarterdmg.push(innerType as PokemonTypes);
    }
  });

  const x2TypesCount: Record<string, number> = {};
  aux = [...x2dmg];

  aux.forEach((innerType) => {
    x2TypesCount[innerType] = (x2TypesCount[innerType] || 0) + 1;
    if (x2TypesCount[innerType] === 2) {
      x2dmg = x2dmg.filter((type) => type !== innerType);
      x4dmg.push(innerType as PokemonTypes);
    }
  });

  const x1dmg = x2dmg.map((type) => {
    if (halfdmg.includes(type)) {
      return type;
    }
  });

  return {
    x0dmg: x0dmg,
    halfdmg: halfdmg.filter(
      (type) => !x1dmg.includes(type) && !x0dmg.includes(type)
    ),
    x2dmg: x2dmg.filter(
      (type) => !x1dmg.includes(type) && !x0dmg.includes(type)
    ),
    quarterdmg: quarterdmg,
    x4dmg: x4dmg,
  };

  
};

export { getTypesEffectiveness };
