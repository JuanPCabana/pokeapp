import React from 'react';
import { getColorByType } from '@/utils/gradientMaker';
import { typeIcons } from '@/public/img/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import getPokemonTypeName from '@/utils/getPokemonTypeName';

interface PokemonTypeIconProps {
  type: string;
  tooltip?: boolean;
}

const PokemonTypeIcon: React.FC<PokemonTypeIconProps> = ({ type, tooltip = false }) => {
  const IconComponent = typeIcons[type];
  const color = getColorByType(type).secondary;
  const iconStyle = { fill: color, stroke: "#000", strokeWidth: 15 }

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip >
          <TooltipTrigger className="w-full h-full">
            {IconComponent ? (
              <IconComponent className="w-full h-full" style={iconStyle} />
            ) : null}
          </TooltipTrigger>
          <TooltipContent>
            <p>{getPokemonTypeName(type)}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

    );
  }
  else {
    return IconComponent ? (
      <IconComponent className="w-full h-full" style={iconStyle} />
    ) : null;
  }
};

export default PokemonTypeIcon;
