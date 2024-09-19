'use client';
import React from 'react'
import { useGetPokemonsQuery } from '@/redux/services/pokemonApi'
import { Input } from '@/components/ui/input'
import pokeball from '@/public/img/pokeball.svg'
import Header from '@/components/Templates/Header'

const HomePage = () => {
  const placeHolderText = 'Ingrese el nombre del pokemon'
  const { data, error, isLoading } = useGetPokemonsQuery({ limit: 12, offset: 0 })
  const pokemonRender = () => {
    if (isLoading) return <img src={pokeball.src} alt='pokeball' className='w-40 h-40 animate-spin' />
    if (error) return <p>Error</p>
    return data?.results.map((pokemon) => <div key={pokemon.name} > {pokemon.name}</div >)
  }

  return (
    <div>
      <Header />
      <div className='flex flex-col justify-center items-center'>
        <h1>HomePage</h1>
        <Input className='w-80' type='text' placeholder={placeHolderText} />
      </div>

      <div className='grid grid-cols-3 gap-3'>
        {pokemonRender()}
      </div>

    </div>
  )
}

export default HomePage