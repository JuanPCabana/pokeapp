import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useGetPokemonByidQuery, useGetPokemonEvoChainByidQuery, useGetPokemonSpecieByidQuery } from '@/redux/services/pokemonApi'
import PokeballSpinner from '../misc/PokeballSpinner'
import capitalizer from '@/utils/capitalizer'
import { gradientMaker } from '@/utils/gradientMaker'
import pokeballSvg from '@/public/img/pokeball.svg'

interface PokemonCardProps {
  pokemon: {
    name: string
    url: string
  }
}


const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const pokemonId = pokemon.url.split('pokemon/')[1]
  const { data: pokemonData, error, isLoading } = useGetPokemonByidQuery(pokemonId)
  const { data: specieData, isLoading: isLoading2 } = useGetPokemonSpecieByidQuery(pokemonId)
  const { data: evoChainData, isLoading: isLoading3 } = useGetPokemonEvoChainByidQuery(specieData?.evolution_chain.url.split('evolution-chain/')[1])
  console.log("🚀 ~ evoChainData:", evoChainData)

  const pokemonInfoRender = () => {
    if (isLoading || isLoading2 || isLoading3) return <PokeballSpinner variant='pokemon' />
    if (error) return <p>Error</p>
    else {
      const gradient = gradientMaker(pokemonData?.types[0].type.name, pokemonData?.types[1]?.type.name)
      const generationStrings = specieData?.generation?.name?.split('-')
      const pokedexNumber = specieData?.pokedex_numbers[0]?.entry_number
      return <Card style={gradient} className='border-0 transform transition-transform duration-300 hover:scale-105'>
        <CardHeader>
          <CardTitle>{pokedexNumber ? `${pokedexNumber} - ` : ''} {capitalizer(pokemon.name)}</CardTitle>
          {generationStrings && <CardDescription className='text-black'>{capitalizer(generationStrings[0])} {generationStrings[1].toUpperCase()}</CardDescription>}
        </CardHeader>
        <CardContent>
          {pokemonData && (
            <>
              <div className='w-full h-3/4'>
                <img src={pokemonData.sprites.front_default ?? pokeballSvg.src} alt={pokemonData.name} className='w-full h-full' />
              </div>
              <ul>
                {pokemonData.types.map((type, index) => (
                  <li key={index}>{capitalizer(type.type.name)}</li>
                ))}
              </ul>
            </>
          )
          }
        </CardContent>
        {/* <CardFooter>
      <p>Card Footer</p>
      </CardFooter> */}
      </Card>
    }
  }

  return (
    pokemonInfoRender()
  )
}

export default PokemonCard