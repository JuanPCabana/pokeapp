import React from 'react'
import PokemonTypeIcon from '../misc/PokemonTypeIcon'
import capitalizer from '@/utils/capitalizer'
import getPokemonTypeName from '@/utils/getPokemonTypeName'
import { Badge } from '../ui/badge'
import { PokemonTypes } from '@/utils/types/pokemonTypes'

interface ResistanceMapperProps {
  dmgMapper: PokemonTypes[] | undefined | string[]
  title?: string | JSX.Element
  titleClass?: string
  boxClass?: string
  badgeClass?: string
}

const ResistanceMapper: React.FC<ResistanceMapperProps> = ({ dmgMapper = [], title, titleClass = "", boxClass = "", badgeClass = '' }) => {
  return (
    dmgMapper && dmgMapper.length > 0 &&
    <div className={'flex ' + boxClass}>
      {title && <h4 className={'mr-3' + titleClass} >{title}</h4>}
      <ul className='flex'>
        {dmgMapper.map((type, index) => (
          <Badge key={index} variant="default" className={'w-fit flex mb-1.5 mr-1.5 ' + badgeClass}>
            <li className='flex items-center '>
              <div className='w-5 h-5' >
                <PokemonTypeIcon type={type} />
              </div>
              <p className='ml-2'>{capitalizer(getPokemonTypeName(type))}</p>
            </li>
          </Badge>))}
      </ul>
    </div>)
}

export default ResistanceMapper