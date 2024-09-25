'use client';
import React, { useEffect } from 'react'
import PokemonList from '@/components/Pokemon/PokemonList';
import { useGetPokemonsQuery } from '@/redux/services/pokemonApi';
import { setDisplayPokemonList, setFullPokemonList, setSearchQuery } from '@/redux/features/pokemonSlice';
import PokeballSpinner from '@/components/misc/PokeballSpinner';
import Paginator from '@/components/misc/Paginator';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import SearchBar from '@/components/searchUtils/SearchBar';

const HomePage = () => {

  const dispatch = useAppDispatch()

  const placeHolderText = 'Nombre del pokemon o ID'

  const limit = useAppSelector((state) => state.pokemonReducer.limit)
  const offset = useAppSelector((state) => state.pokemonReducer.offset)
  const type = useAppSelector((state) => state.pokemonReducer.typeFilter)
  const generation = useAppSelector((state) => state.pokemonReducer.generationFilter)
  const refetchTrigger = useAppSelector((state) => state.pokemonReducer.refetchTrigger)
  const searchQuery = useAppSelector((state) => state.pokemonReducer.searchQuery)
  const fullPokemonList = useAppSelector((state) => state.pokemonReducer.fullPokemonList)
  const { data, error, isLoading, refetch } = useGetPokemonsQuery({ limit: 10000, offset: 0, type, generation })

  useEffect(() => {
    if (!isLoading && !error && data) {
      if (fullPokemonList.length === 0 || searchQuery === '') {
        dispatch(setFullPokemonList(data.results))
        dispatch(setDisplayPokemonList({
          limit,
          offset
        }))
      }
    }
  }, [data, isLoading, error, dispatch, limit, offset, fullPokemonList.length, searchQuery])

  useEffect(() => {
    refetch()
  }, [type, generation, refetchTrigger, refetch])

  useEffect(() => {
    if (searchQuery) {
      dispatch(setSearchQuery(searchQuery))
    }
  }, [dispatch, searchQuery])

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
        <SearchBar placeholder={placeHolderText} />
      </div>
      <div className='flex justify-center items-center min-h-[75vh] min-w-[80vw]' >
        {renderPokemonList()}
      </div>
      <Paginator />
    </div>
  )
}

export default HomePage