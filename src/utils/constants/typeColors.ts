/**
 * @description Colores de los tipos de pokémon
 * @example
 * TYPE_COLORS["normal"] // { primary: "#A8A77A", secondary: "#8A895E" }
 */
const TYPE_COLORS: Record<string, { primary: string; secondary: string }> = {
  normal: { primary: "#A8A77A", secondary: "#8A895E" },
  fire: { primary: "#EE8130", secondary: "#D46F28" },
  water: { primary: "#6390F0", secondary: "#5174C7" },
  electric: { primary: "#F7D02C", secondary: "#D4B224" },
  grass: { primary: "#7AC74C", secondary: "#62A53C" },
  ice: { primary: "#96D9D6", secondary: "#7BB3B2" },
  fighting: { primary: "#C22E28", secondary: "#A42621" },
  poison: { primary: "#A33EA1", secondary: "#842F82" },
  ground: { primary: "#E2BF65", secondary: "#C4A457" },
  flying: { primary: "#A98FF3", secondary: "#8D72D6" },
  psychic: { primary: "#F95587", secondary: "#D13F6D" },
  bug: { primary: "#A6B91A", secondary: "#879417" },
  rock: { primary: "#B6A136", secondary: "#96832B" },
  ghost: { primary: "#735797", secondary: "#5E477A" },
  dragon: { primary: "#6F35FC", secondary: "#5B2DC9" },
  dark: { primary: "#705746", secondary: "#594634" },
  steel: { primary: "#B7B7CE", secondary: "#9595A9" },
  fairy: { primary: "#D685AD", secondary: "#B36C8F" },
  default: { primary: "#c4c4c4", secondary: "#c4c4c4" }, // Opción por defecto
};

export { TYPE_COLORS };
