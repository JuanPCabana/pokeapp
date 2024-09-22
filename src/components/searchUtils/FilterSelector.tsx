import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { POKEMON_TYPES_TRADUCTION, POKEMON_TYPES, POKEMON_GENERATIONS, POKEMON_GENERATIONS_LABELS } from '@/utils/constants'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setTypeFilter, setGenerationFilter } from '@/redux/features/pokemonSlice'

type VariantTypes = 'type' | 'generation'

interface FilterSelectorProps {
  variant: VariantTypes
  className?: string
  props?: Record<string, unknown>
  selectProps?: Record<string, unknown>
}

const FilterSelector: React.FC<FilterSelectorProps> = ({ variant, className, selectProps, ...props }) => {

  const dispatch = useAppDispatch()

  const mapperData = {
    type: {
      title: 'Tipo',
      keys: POKEMON_TYPES,
      labels: POKEMON_TYPES_TRADUCTION,
      value: useAppSelector((state) => state.pokemonReducer.typeFilter),
      dispatcher: setTypeFilter
    },
    generation: {
      title: 'Generación',
      keys: POKEMON_GENERATIONS,
      labels: POKEMON_GENERATIONS_LABELS,
      value: useAppSelector((state) => state.pokemonReducer.generationFilter),
      dispatcher: setGenerationFilter
    }
  }


  return (
    <div className={className} {...props}>
      <Select value={mapperData[variant].value} onValueChange={(value) => dispatch(mapperData[variant].dispatcher(value !== 'none' ? value : undefined))} {...selectProps} >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={mapperData[variant].title} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={'none'}>{mapperData[variant].title}</SelectItem>
          {mapperData[variant].keys.map((entry) => (
            <SelectItem key={entry} value={entry}>
              {mapperData[variant].labels[entry]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default FilterSelector