import React from 'react'
import PokemonCard from './PokemonCard'
import { useAppSelector } from '@/redux/hooks'


/**
 * Elemento que retorna una lista de pokemones en forma de tarjetas.
 * @returns JSX
 */
const PokemonList = () => {
  const pokemonList = useAppSelector((state) => state.pokemonReducer.displayPokemonList)

  if (pokemonList.length === 0) return (
    <div className='flex justify-center items-center w-full h-full'>
      <p className='text-2xl text-gray-500'>
        No se encontraron pokemones
        <br />
        Prueba eliminar los filtros o buscar otro pokemon
      </p>
    </div>
  )

  return (

    <div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 min-h-4/5 min-w-full p-8'>
      {pokemonList.map((pokemon) => <PokemonCard key={pokemon.name} pokemon={pokemon} />)}
    </div>


  )
}

export default PokemonList