interface PokemonHabitatTraduction {
  cave: string;
  forest: string;
  grassland: string;
  mountain: string;
  rare: string;
  roughTerrain: string;
  sea: string;
  urban: string;
  watersEdge: string;
  [key: string]: string;
}

const POKEMON_HABITAT_TRADUCTION: PokemonHabitatTraduction = {
  cave: "Cueva / Cave",
  forest: "Bosque / Forest",
  grassland: "Pradera / Grassland",
  mountain: "Montaña / Mountain",
  rare: "Raro / Rare",
  roughTerrain: "Terreno abrupto / Rough terrain",
  sea: "Mar / Sea",
  urban: "Urbano / Urban",
  watersEdge: "Orilla del agua / Water's edge",
};
export { POKEMON_HABITAT_TRADUCTION };
