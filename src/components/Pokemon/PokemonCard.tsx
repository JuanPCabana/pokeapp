import React from 'react'
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
import { pushPokemonInfo } from '@/redux/features/pokemonSlice'
import { useDispatch } from 'react-redux'
import { Pokemon } from '@/utils/types/pokemonTypes'
import { Badge } from '../ui/badge'

interface PokemonCardProps {
  pokemon: Pokemon
}


const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const dispatch = useDispatch()
  const pokemonId = pokemon.id
  const { data: pokemonData, error, isLoading } = useGetPokemonByidQuery(pokemonId)

  const pokemonInfoRender = () => {
    if (isLoading) return <PokeballSpinner variant='pokemon' />
    if (error) return <p>Error</p>
    else {
      dispatch(pushPokemonInfo(pokemonData))
      const gradient = gradientMaker(pokemonData?.types[0], pokemonData?.types[1])
      const pokemonName = pokemonData?.name.split('-').map((word: string) => capitalizer(word)).join(' ')
      const generationStrings = pokemonData?.generation && pokemonData?.generation.split("-")
      const pokedexNumber = pokemonData?.nationalPokedexNumber
      const strongAgainst = pokemonData?.combatData.strongAgainst2x
      const weakAgainst = pokemonData?.combatData.weakAgainst2x
      const weakAgainst4x = pokemonData?.combatData.weakAgainst4x

      return (
        <Card style={gradient} className='border-0 transform transition-transform duration-300 hover:scale-105'>

          <CardHeader className='h-1/5'>
            <CardTitle className=''>
              N° {pokedexNumber}
              <br />
              {pokemonName}
            </CardTitle>

            {generationStrings &&
              <Badge variant='default' className='w-fit'>
                <CardDescription className=' text-white' >{capitalizer(generationStrings[0])} {generationStrings[1]?.toUpperCase()}</CardDescription>
              </Badge>
            }
          </CardHeader>

          <CardContent className='pb-1.5 h-[46%]' >
            {pokemonData && (
              <>
                <div className='w-full h-3/4 flex justify-center items-center'>
                  {pokemonData.img ?
                    <Image width={100} height={100} src={pokemonData.img} alt={pokemonData.name} className='w-full h-full' />
                    :
                    <div className='w-full h-full flex justify-center items-center'>
                      <Pokeball className='w-3/4 h-3/4' />
                    </div>
                  }
                </div>
                <ul>
                  {pokemonData.types.map((type, index) => (
                    <Badge key={index} variant="default" className='w-fit flex mb-1.5 '>
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
            )
            }
          </CardContent>

          <CardFooter className='flex flex-col items-start h-[34%]' >

            {strongAgainst && strongAgainst?.length > 0 &&
              <div className='flex flex-col mb-2 max-w-full'>
                <h2 className='text-black text-lg'>Fuerte contra (x2):</h2>
                <div className='flex max-w-full' >
                  {strongAgainst?.map((type, index) => (
                    <div key={index} className='w-5 h-5 mr-1'>
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
                    <div key={index} className='w-5 h-5 mr-1'>
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
                    <div key={index} className='w-5 h-5 mr-1'>
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