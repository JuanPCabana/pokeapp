import React from 'react'
import { Input } from '../ui/input'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { resetFilters, setSearchQuery } from '@/redux/features/pokemonSlice'
import FilterSelector from './FilterSelector'
import { Button } from '../ui/button'

interface SearchBarProps {
  placeholder: string
}

/**
 * Componente que se encarga de mostrar un buscador y selectores de filtros para los pokemones.
 * @param placeholder Placeholder del buscador.
 * @returns JSX
 */
const SearchBar: React.FC<SearchBarProps> = ({ placeholder }) => {
  const dispatch = useAppDispatch()
  const searchQuery = useAppSelector((state) => state.pokemonReducer.searchQuery)
  return (
    <div className='grid grid-cols-4 gap-5'>
      <div>
        <h1 className='my-3' >Buscador </h1>
        <Input className='w-full ' type='text' placeholder={placeholder} value={searchQuery} onChange={(e) => dispatch(setSearchQuery(e.target.value))} />
      </div>

      <div className='flex items-end justify-center w-full'>
        <FilterSelector variant='type' className='max-h-10 w-full' />
      </div>
      <div className='flex items-end justify-center w-full'>
        <FilterSelector variant='generation' className='max-h-10 w-full' />
      </div>
      <div className='flex items-end justify-center w-full'>
        <Button variant='secondary' className='w-full' onClick={() => dispatch(resetFilters())}>Reset Filters</Button>
      </div>
    </div>
  )
}

export default SearchBar