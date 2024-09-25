import React from 'react'
import TypesMapper from './ResistanceMapper'
import { EffectivenessIface } from '@/utils/types/pokemonTypes'

interface KeyValues {
  [key: string]: string
}

interface ResistanceDetailsProps extends React.HTMLAttributes<HTMLDivElement> {
  resistanceData: EffectivenessIface
}

/**
 * Componente que mapea los tipos de daño de un pokemon en badges que indican la resistencia del pokemon a ese tipo de daño.
 * @param resistanceData Objeto que contiene en sus propiedades la efectividad o resistencia y el valor sera un array con los tipos de daño que recibe/ocasiona el pokemon.
 * @returns JSX
 */
const ResistanceDetails: React.FC<ResistanceDetailsProps> = ({ resistanceData, ...props }) => {
  return Object.keys(resistanceData).map((key) => {

    const keyValues: KeyValues = {
      x0dmg: `${0}`,
      quarterdmg: `${0.25}`,
      halfdmg: `${0.5}`,
      x2dmg: `${2}`,
      x4dmg: `${4}`
    }
    if (resistanceData[key].length > 0) {
      return (
        <TypesMapper key={key} dmgMapper={resistanceData[key]} title={keyValues[key]} {...props} />
      )
    }
  })

}

export default ResistanceDetails