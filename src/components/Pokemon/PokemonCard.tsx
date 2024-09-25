import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { pushPokemonInfo, setGenerationFilter, setSearchQuery, setSelectedPokemon, setTypeFilter } from '@/redux/features/pokemonSlice'
import { useAppSelector } from '@/redux/hooks'
import { useGetPokemonByidQuery } from '@/redux/services/pokemonApi'
import capitalizer from '@/utils/capitalizer'
import getPokemonTypeName from '@/utils/getPokemonTypeName'
import { gradientMaker } from '@/utils/gradientMaker'
import { Pokemon } from '@/utils/types/pokemonTypes'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import CardTypeMapper from "../misc/CardTypeMapper"
import ImageDisplayer from '../misc/ImageDisplayer'
import PokeballSpinner from '../misc/PokeballSpinner'
import PokemonTypeIcon from '../misc/PokemonTypeIcon'
import { Badge } from '../ui/badge'

interface PokemonCardProps {
  pokemon: Pokemon
}
interface KeyValues {
  [key: string]: string
}

/**
 * 
 * @param pokemon Objeto de tipo Pokemon a mostrar en la tarjeta
 * @returns JSX
 */
const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const dispatch = useDispatch()

  const pokemonId = pokemon.id
  const displayPokemonList = useAppSelector(state => state.pokemonReducer.displayPokemonList)
  const limit = useAppSelector(state => state.pokemonReducer.limit)
  const searchQuery = useAppSelector(state => state.pokemonReducer.searchQuery)
  const searchingByName = isNaN(parseInt(searchQuery))
  const { data: pokemonData, error, isLoading, refetch } = useGetPokemonByidQuery(pokemonId)

  useEffect(() => {
    if (pokemonData) dispatch(pushPokemonInfo(pokemonData))
  }, [dispatch, pokemonData])

  useEffect(() => {
    const displayListHaveSpace = displayPokemonList.length < limit
    const anyEvolutionNotInDisplayList = pokemonData && pokemonData.evolutionChain.some(pokemon => displayPokemonList.findIndex(p => p.id === pokemon.id) === -1)

    if (anyEvolutionNotInDisplayList && displayListHaveSpace && searchingByName) {
      dispatch(setSearchQuery(searchQuery))
    }
  }, [dispatch, displayPokemonList, limit, pokemonData, searchQuery, searchingByName])


  if (isLoading) return <PokeballSpinner variant='pokemon' />
  if (error) {
    refetch()
    return <p>Error</p>
  }

  const gradient = gradientMaker(pokemonData?.types[0], pokemonData?.types[1])
  const pokemonName = pokemonData?.name.split('-').map((word: string) => capitalizer(word)).join(' ') as string
  const pokemonMainImg = pokemonData?.img as string
  const generationStrings = pokemonData?.generation && pokemonData?.generation.split("-")
  const pokemonGeneration = generationStrings && generationStrings[1].toUpperCase()
  const pokedexNumber = pokemonData?.nationalPokedexNumber
  const pokemonTypes = pokemonData?.types as string[]
  const inmuneAgainst = pokemonData?.resistances?.x0dmg as string[]
  const veryStrongAgainst = pokemonData?.resistances?.quarterdmg as string[]
  const strongAgainst = pokemonData?.resistances?.halfdmg as string[]
  const weakAgainst = pokemonData?.resistances?.x2dmg as string[]
  const weakAgainst4x = pokemonData?.resistances?.x4dmg as string[]

  const damageKeys: KeyValues = {
    x0dmg: '(x0)',
    quarterdmg: '(x0.25)',
    halfdmg: '(x0.5)',
    x2dmg: '(x2)',
    x4dmg: '(x4)'
  }

  return (
    <Card style={gradient} className='border-0 transform transition-transform duration-300 hover:scale-105'>

      <CardHeader className='h-1/5'>
        <Link href={`/${pokemonId}`} onClick={() => dispatch(setSelectedPokemon(pokemonData))} >

          <CardTitle className=''>
            N° {pokedexNumber}
            <br />
            {pokemonName}
          </CardTitle>
        </Link>

        {generationStrings &&
          <Badge variant='default' className='w-fit z-50' onClick={() => dispatch(setGenerationFilter(pokemonData?.generation))} >
            <CardDescription className=' text-white' >Gen. {pokemonGeneration}</CardDescription>
          </Badge>
        }
      </CardHeader>

      <CardContent className='pb-1.5 h-[46%]' >

        <>
          <Link href={`/${pokemonId}`} onClick={() => dispatch(setSelectedPokemon(pokemonData))} >
            <div className='w-full h-3/4 flex justify-center items-center'>
              <ImageDisplayer src={pokemonMainImg} alt={pokemonName} />

            </div>
          </Link>
          <ul>
            {pokemonTypes.map((type, index) => (
              <Badge key={index} variant="default" className='w-fit flex mb-1.5 ' onClick={() => dispatch(setTypeFilter(type))}>
                <li className='flex items-center '>
                  <div className='w-5 h-5'>
                    <PokemonTypeIcon type={type} />
                  </div>
                  <p className='ml-2'>{capitalizer(getPokemonTypeName(type))}</p>
                </li>
              </Badge>
            ))}
          </ul>
        </>

      </CardContent>

      <CardFooter className='flex flex-col items-start h-[34%]' >
        <CardDescription className=' text-white' >Daño:</CardDescription>
        <CardTypeMapper typeList={inmuneAgainst} text={damageKeys.x0dmg} />
        <CardTypeMapper typeList={veryStrongAgainst} text={damageKeys.quarterdmg} />
        <CardTypeMapper typeList={strongAgainst} text={damageKeys.halfdmg} />
        <CardTypeMapper typeList={weakAgainst} text={damageKeys.x2dmg} />
        <CardTypeMapper typeList={weakAgainst4x} text={damageKeys.x4dmg} />
      </CardFooter>
    </Card >
  )

}

export default PokemonCard