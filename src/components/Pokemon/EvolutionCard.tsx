import { useGetPokemonByidQuery } from "@/redux/services/pokemonApi"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { getColorByType, gradientMaker } from "@/utils/gradientMaker"
import capitalizer from "@/utils/capitalizer"
import { useAppDispatch } from "@/redux/hooks"
import { setSelectedPokemon } from "@/redux/features/pokemonSlice"
import { Badge } from "../ui/badge"
import Image from "next/image"
import Pokeball from "@/public/img/pokeball.svg"
import PokemonTypeIcon from "../misc/PokemonTypeIcon"
import getPokemonTypeName from "@/utils/getPokemonTypeName"
import Link from "next/link"
import ResistanceMapper from "./ResistanceMapper"
import { MoveRight } from "lucide-react"

interface EvolutionCardProps {
  evolutionId: string;
  index: number;
  active?: boolean;
}

const EvolutionCard: React.FC<EvolutionCardProps> = ({ evolutionId, index, active }) => {

  const dispatch = useAppDispatch()


  const { data: pokemonData, error, isLoading } = useGetPokemonByidQuery(evolutionId ?? '')

  if (isLoading && !pokemonData) return <p>Loading...</p>
  if (error) return <p>Error</p>
  if (pokemonData) {

    const gradient = gradientMaker(pokemonData?.types[0], pokemonData?.types[1], true)
    const pokemonName = pokemonData?.name.split('-').map((word: string) => capitalizer(word)).join(' ')
    const generationStrings = pokemonData?.generation && pokemonData?.generation.split("-")
    const pokedexNumber = pokemonData?.nationalPokedexNumber

    return (
      <Card key={pokemonData.nationalPokedexNumber} className={`flex flex-col items-center justify-between h-full p-2 border-black ${active && "transform scale-110"}`} style={gradient} >

        {generationStrings &&
          <Badge variant='default' className='w-4/5 flex justify-center '  >
            <CardDescription className=' text-white' >Gen. {generationStrings[1]?.toUpperCase()}</CardDescription>
          </Badge>
        }

        <div className="flex items-center mt-1">
          <ResistanceMapper dmgMapper={pokemonData.types} listBoxClass='justify-center' badgeClass="mr-0" />
        </div>

        <Link href={`/${pokemonData.id}`} onClick={() => dispatch(setSelectedPokemon(pokemonData))} >
          <img src={pokemonData.img} alt={pokemonData.name} className="w-16 h-16 object-contain" />
          <span className="text-sm font-semibold">
            N°{pokedexNumber}
            <br />
            {pokemonName}
          </span>
          {index < pokemonData.evolutionChain.length - 1 ?
            <MoveRight />
            :
            <div>&nbsp;</div>
          }
        </Link>

      </Card>

    )
  }

}

export default EvolutionCard