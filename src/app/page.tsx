'use client';
import React from 'react'
import { Input } from '@/components/ui/input'
import PokemonList from '@/components/Pokemon/PokemonList';
import { useGetPokemonsQuery } from '@/redux/services/pokemonApi';
import { useDispatch } from 'react-redux';
import { setDisplayPokemonList, setFullPokemonList, setSearchQuery } from '@/redux/features/pokemonSlice';
import PokeballSpinner from '@/components/misc/PokeballSpinner';
import Paginator from '@/components/misc/Paginator';
import { useAppSelector } from '@/redux/hooks';

const HomePage = () => {
  const placeHolderText = 'Ingrese el nombre del pokemon'

  const dispatch = useDispatch()

  const { data, error, isLoading } = useGetPokemonsQuery({ limit: 10000, offset: 0 })
  const limit = useAppSelector((state) => state.pokemonReducer.limit)
  const offset = useAppSelector((state) => state.pokemonReducer.offset)

  if (!isLoading && !error && data) {
    dispatch(setFullPokemonList(data.results))
    dispatch(setDisplayPokemonList({
      fullList: data.results,
      limit,
      offset
    }))
  }

  const renderPokemonList = () => {
    if (isLoading) return <PokeballSpinner variant='main' />
    if (error) return <p>Error</p>
    return (
      <div className='flex justify-center items-center w-full h-full'>
        <PokemonList />
      </div>
    )
  }

  return (
    <div className='h-4/5 w-4/5 flex flex-col items-center'>
      <div className='flex flex-col justify-center items-center h-1/5'>
        <h1>Buscador por nombre o Numero de pokedex nacional</h1>
        <Input className='w-80' type='text' placeholder={placeHolderText} onChange={(e) => dispatch(setSearchQuery(e.target.value))} />
      </div>
      <div className='flex justify-center items-center min-h-75vh min-w-80vw' >
        {renderPokemonList()}
      </div>
      <Paginator />
    </div>
  )
}

export default HomePage