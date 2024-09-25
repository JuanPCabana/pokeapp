import { TYPE_COLORS } from "./typeColors";

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

function getColorByType(type: string) {
  return TYPE_COLORS[type] || TYPE_COLORS["default"];
}

export { gradientMaker, getColorByType };
