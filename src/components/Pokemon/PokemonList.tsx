import React from 'react'
import PokemonCard from './PokemonCard'
import { useAppSelector } from '@/redux/hooks'



const PokemonList = () => {
  const pokemonList = useAppSelector((state) => state.pokemonReducer.displayPokemonList)

  return (
    <div className='grid grid-cols-4 gap-3 min-h-4/5 p-8'>
      {pokemonList.map((pokemon) => <PokemonCard key={pokemon.name} pokemon={pokemon} />)}
    </div>
  )
}

export default PokemonList