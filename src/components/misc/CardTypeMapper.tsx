import React from "react";
import { Badge } from "../ui/badge";
import { useAppDispatch } from "@/redux/hooks";
import { setTypeFilter } from "@/redux/features/pokemonSlice";
import PokemonTypeIcon from "./PokemonTypeIcon";

interface CardTypeMapperProps extends React.HTMLAttributes<HTMLDivElement> {
  typeList?: string[];
  text?: string;
}

/**
 * Componente que se encarga de mapear los tipos de un pokemon en badges que sirven como filtros.
 * @param typeList Lista de tipos del pokemon.
 * @param text Texto adicional a mostrar junto a los badges.
 * @returns JSX
 */
const CardTypeMapper: React.FC<CardTypeMapperProps> = ({ typeList, text }) => {

  const dispatch = useAppDispatch();

  if (!typeList || typeList.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col mb-2 max-w-full">
      <Badge className="flex max-w-full">
        {typeList?.map((type, index) => (
          <div
            key={index}
            className="w-5 h-5 mr-1"
            onClick={() => dispatch(setTypeFilter(type))}
          >
            <PokemonTypeIcon tooltip={true} type={type} />
          </div>
        ))}
        {text}
      </Badge>
    </div>
  );
};

export default CardTypeMapper;
