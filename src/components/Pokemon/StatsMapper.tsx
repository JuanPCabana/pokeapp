import { POKEMON_STATS_TRADUCTION } from '@/utils/constants'
import React from 'react'
import { Progress } from '../ui/progress'
import { ShortStatsIface } from '@/utils/types/pokemonTypes'

interface StatsMapperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  statsList: ShortStatsIface[]
  color: {
    background: string
  }
}

/**
 * Componente que mapea los stats de un pokemon en barras de progreso.
 * @param statsList Lista de objetos de tipo ShortStatsIface con las stats del pokemon
 * @param color objeto de tipo {background: string} que contiene el color de fondo de la barra de progreso.
 * @returns JSX
 */
const StatsMapper: React.FC<StatsMapperProps> = ({ statsList, color, ...props }) => {
  return (statsList.map((stat) => (
    <div key={stat.name} className="flex items-center gap-2 mb-2" {...props}>
      <span className="w-32 text-sm">{POKEMON_STATS_TRADUCTION[stat.name]}</span>
      <Progress style={color} value={stat.value} className='bg-slate-500 border-solid border-black border-2' />
      <span className="w-8 text-sm text-right">{stat.value}</span>
    </div>
  )))
}

export default StatsMapper