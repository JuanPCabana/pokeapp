import { TYPE_COLORS } from "./constants/typeColors";

/**
 * Calcula un gradiente de colores en base a los tipos de un pokemon.
 * @param type1 Recibe el tipo de pokemon
 * @param type2 Recibe el segundo tipo de pokemon (opcional)
 * @param reverse Cambia el orden de los colores del gradiente para colocar el color secundario en la parte superior
 * @returns retorna un objeto con el gradiente de colores
 */
const gradientMaker = (
  type1: string = "normal",
  type2?: string,
  reverse: boolean = false
) => {
  const mainColor = getColorByType(type1).primary;
  const secondaryColor = type2
    ? getColorByType(type2).primary
    : getColorByType(type1).secondary;

  const color1 = !reverse ? mainColor : secondaryColor;
  const color2 = !reverse ? secondaryColor : mainColor;

  const gradient = {
    background: `linear-gradient(to bottom right, ${color1}, ${color2})`,
  };

  return gradient;
};

/**
 * Obtiene el color de un tipo de pokemon.
 * @param type Recibe el tipo de pokemon
 * @returns Retorna el color del tipo de pokemon
 */
function getColorByType(type: string) {
  return TYPE_COLORS[type] || TYPE_COLORS["default"];
}

export { gradientMaker, getColorByType };
