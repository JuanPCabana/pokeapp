import React from 'react'
import PokemonTypeIcon from '../misc/PokemonTypeIcon'
import capitalizer from '@/utils/capitalizer'
import getPokemonTypeName from '@/utils/getPokemonTypeName'
import { Badge } from '../ui/badge'
import { PokemonTypes } from '@/utils/types/pokemonTypes'
import { Shield } from 'lucide-react'

interface ResistanceMapperProps {
  dmgMapper: PokemonTypes[] | undefined | string[]
  title?: number | string
  titleClass?: string
  boxClass?: string
  badgeClass?: string
  listBoxClass?: string
}

/**
 * Mapea los tipos de daño de un pokemon
 * @param dmgMapper Lista de tipos de pokemon
 * @param title Título del mapeo
 * @param titleClass Clase del título
 * @param boxClass Clase del contenedor
 * @param badgeClass Clase de la chapa
 * @param listBoxClass Clase de la lista
 * @returns JSX
 */
const TypesMapper: React.FC<ResistanceMapperProps> = ({ dmgMapper = [], title, titleClass = "", boxClass = "", badgeClass = "", listBoxClass = "" }) => {
  return (
    dmgMapper && dmgMapper.length > 0 &&
    <div className={'flex flex-col ' + boxClass}>
      {title &&
        <Badge className={`mb-3 flex text-center justify-center`} >
          <h3 className={'font-bold flex justify-around items-center ' + titleClass} > <Shield className='mr-1' /> Daño (x{title})</h3>
        </Badge>
      }
      <ul className={'flex flex-wrap ' + listBoxClass}>
        {dmgMapper.map((type, index) => (
          <Badge key={index} variant="default" className={'w-fit flex mb-1.5 mr-1.5 max-h-8 ' + badgeClass}>
            <li className='flex items-center '>
              <div className='w-5 h-5' >
                <PokemonTypeIcon type={type} />
              </div>
              <p className='ml-2'>{capitalizer(getPokemonTypeName(type))}</p>
            </li>
          </Badge>))}
      </ul>
    </div>

  )
}

export default TypesMapper

