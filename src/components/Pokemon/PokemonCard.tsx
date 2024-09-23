import React, { useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useGetPokemonByidQuery } from '@/redux/services/pokemonApi'
import PokeballSpinner from '../misc/PokeballSpinner'
import capitalizer from '@/utils/capitalizer'
import { gradientMaker } from '@/utils/gradientMaker'
import PokemonTypeIcon from '../misc/PokemonTypeIcon'
import Image from 'next/image'
import getPokemonTypeName from '@/utils/getPokemonTypeName'
import Pokeball from '@/public/img/pokeball.svg'
import { pushPokemonInfo, setGenerationFilter, setSelectedPokemon, setTypeFilter } from '@/redux/features/pokemonSlice'
import { useDispatch } from 'react-redux'
import { Pokemon } from '@/utils/types/pokemonTypes'
import { Badge } from '../ui/badge'
import Link from 'next/link'

interface PokemonCardProps {
  pokemon: Pokemon
}


const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const dispatch = useDispatch()
  const pokemonId = pokemon.id
  const { data: pokemonData, error, isLoading, refetch } = useGetPokemonByidQuery(pokemonId)

  useEffect(() => {
    if (pokemonData) dispatch(pushPokemonInfo(pokemonData))
  }, [dispatch, pokemonData])

  const pokemonInfoRender = () => {
    if (isLoading) return <PokeballSpinner variant='pokemon' />
    if (error) {
      refetch()
      return <p>Error</p>
    }
    else {
      const gradient = gradientMaker(pokemonData?.types[0], pokemonData?.types[1])
      const pokemonName = pokemonData?.name.split('-').map((word: string) => capitalizer(word)).join(' ')
      const generationStrings = pokemonData?.generation && pokemonData?.generation.split("-")
      const pokedexNumber = pokemonData?.nationalPokedexNumber
      const strongAgainst = pokemonData?.resistances?.halfdmg
      const weakAgainst = pokemonData?.resistances?.x2dmg
      const weakAgainst4x = pokemonData?.resistances?.x4dmg

      return (
        <Card style={gradient} className='border-0 transform transition-transform duration-300 hover:scale-105'>

          <CardHeader className='h-1/5'>
            <Link href={`/${pokemon.id}`} onClick={() => dispatch(setSelectedPokemon(pokemonData))} >

              <CardTitle className=''>
                N° {pokedexNumber}
                <br />
                {pokemonName}
              </CardTitle>
            </Link>

            {generationStrings &&
              <Badge variant='default' className='w-fit z-50' onClick={() => dispatch(setGenerationFilter(pokemonData?.generation))} >
                <CardDescription className=' text-white' >{capitalizer(generationStrings[0])} {generationStrings[1]?.toUpperCase()}</CardDescription>
              </Badge>
            }

          </CardHeader>

          <CardContent className='pb-1.5 h-[46%]' >
            {pokemonData && (
              <>
                <Link href={`/${pokemon.id}`} onClick={() => dispatch(setSelectedPokemon(pokemonData))} >
                  <div className='w-full h-3/4 flex justify-center items-center'>
                    {pokemonData.img ?
                      <Image width={100} height={100} src={pokemonData.img} alt={pokemonData.name} priority={true} className='w-full h-full' />
                      :
                      <div className='w-full h-full flex justify-center items-center'>
                        <Pokeball className='w-3/4 h-3/4' />
                      </div>
                    }
                  </div>
                </Link>
                <ul>
                  {pokemonData.types.map((type, index) => (
                    <Badge key={index} variant="default" className='w-fit flex mb-1.5 '>
                      <li className='flex items-center '>
                        <div className='w-5 h-5' onClick={() => dispatch(setTypeFilter(type))}>
                          <PokemonTypeIcon type={type} />
                        </div>
                        <p className='ml-2'>{capitalizer(getPokemonTypeName(type))}</p>
                      </li>
                    </Badge>
                  ))}
                </ul>
              </>
            )
            }
          </CardContent>

          <CardFooter className='flex flex-col items-start h-[34%]' >

            {strongAgainst && strongAgainst?.length > 0 &&
              <div className='flex flex-col mb-2 max-w-full'>
                <h2 className='text-black text-lg'>Resistente contra (x1/2):</h2>
                <div className='flex max-w-full' >
                  {strongAgainst?.map((type, index) => (
                    <div key={index} className='w-5 h-5 mr-1' onClick={() => dispatch(setTypeFilter(type))} >
                      <PokemonTypeIcon tooltip={true} type={type} />
                    </div>
                  ))}
                </div>
              </div>}

            {weakAgainst && weakAgainst?.length > 0 &&
              <div className='flex flex-col mb-2 max-w-full'>
                <h2 className='text-black text-lg'>Débil contra (x2):</h2>
                <div className='flex' >
                  {weakAgainst?.map((type, index) => (
                    <div key={index} className='w-5 h-5 mr-1' onClick={() => dispatch(setTypeFilter(type))} >
                      <PokemonTypeIcon tooltip={true} type={type} />
                    </div>
                  ))}
                </div>
              </div>}

            {weakAgainst4x && weakAgainst4x?.length > 0 &&
              <div className='flex flex-col mb-2 max-w-full'>
                <h2 className='text-black text-lg'>Débil contra (x4):</h2>
                <div className='flex' >
                  {weakAgainst4x?.map((type, index) => (
                    <div key={index} className='w-5 h-5 mr-1' onClick={() => dispatch(setTypeFilter(type))} >
                      <PokemonTypeIcon tooltip={true} type={type} />
                    </div>
                  ))}
                </div>
              </div>
            }

          </CardFooter>
        </Card >
      )
    }
  }

  return (
    pokemonInfoRender()
  )
}

export default PokemonCard