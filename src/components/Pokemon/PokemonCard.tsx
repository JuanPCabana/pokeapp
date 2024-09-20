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

interface PokemonCardProps {
  pokemon: {
    name: string
    url: string
  }
}


const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const { data, error, isLoading } = useGetPokemonByidQuery(pokemon.url.split('pokemon/')[1])

  const pokemonInfoRender = () => {
    if (isLoading) return <PokeballSpinner />
    if (error) return <p>Error</p>
    else {
      const gradient = gradientMaker(data?.types[0].type.name, data?.types[1]?.type.name)
      console.log("🚀 ~ pokemonInfoRender ~ gradient:", gradient)
      return <Card style={gradient} className='border-0'>
        <CardHeader>
          <CardTitle>{capitalizer(pokemon.name)}</CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent>
          {data && (
            <>
              <div className='w-full h-3/4'>
                <img src={data.sprites.front_default} alt={data.name} className='w-full h-full' />
              </div>
              <ul>
                {data.types.map((type, index) => (
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