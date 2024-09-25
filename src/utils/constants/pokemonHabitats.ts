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
  cave: "Cueva",
  forest: "Bosque",
  grassland: "Pradera",
  mountain: "Montaña",
  rare: "Raro",
  roughTerrain: "Terreno abrupto terrain",
  sea: "Mar",
  urban: "Urbano",
  watersEdge: "Orilla del agua's edge",
};
export { POKEMON_HABITAT_TRADUCTION };
