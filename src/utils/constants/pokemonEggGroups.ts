interface PokemonEggGroupsTraduction {
  monster: string;
  bug: string;
  flying: string;
  ground: string;
  fairy: string;
  plant: string;
  humanshape: string;
  mineral: string;
  ditto: string;
  dragon: string;
  water1: string;
  water2: string;
  water3: string;
  indeterminate: string;
  [key: string]: string;
}

/**
 * Traducción de los grupos de huevos de los pokemones.
 * @example
 * console.log(POKEMON_EGG_GROUPS_TRADUCTION['monster']) => 'Monstruo'
 */
const POKEMON_EGG_GROUPS_TRADUCTION: PokemonEggGroupsTraduction = {
  monster: "Monstruo",
  bug: "Bicho",
  flying: "Volador",
  ground: "Terrestre",
  fairy: "Hada",
  plant: "Planta",
  humanshape: "Humanoide",
  mineral: "Mineral",
  ditto: "Ditto",
  dragon: "Dragón",
  water1: "Agua 1",
  water2: "Agua 2",
  water3: "Agua 3",
  indeterminate: "Indeterminado",
  "no-eggs": "Sin huevos",
};

export { POKEMON_EGG_GROUPS_TRADUCTION };
