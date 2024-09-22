import React from 'react'
import PokemonCard from './PokemonCard'
import { useAppSelector } from '@/redux/hooks'



const PokemonList = () => {
  const pokemonList = useAppSelector((state) => state.pokemonReducer.displayPokemonList)

  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-6 gap-4 min-h-4/5 min-w-full p-8'>
      {pokemonList.map((pokemon) => <PokemonCard key={pokemon.name} pokemon={pokemon} />)}
    </div>
  )
}

export default PokemonList