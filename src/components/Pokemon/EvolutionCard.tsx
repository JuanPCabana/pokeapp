import { setSelectedPokemon } from "@/redux/features/pokemonSlice"
import { useAppDispatch } from "@/redux/hooks"
import { useGetPokemonByidQuery } from "@/redux/services/pokemonApi"
import capitalizer from "@/utils/capitalizer"
import { gradientMaker } from "@/utils/gradientMaker"
import { Pokemon } from "@/utils/types/pokemonTypes"
import { MoveRight } from "lucide-react"
import Link from "next/link"
import ImageDisplayer from "../misc/ImageDisplayer"
import PokeballSpinner from "../misc/PokeballSpinner"
import { Badge } from "../ui/badge"
import { Card, CardDescription } from "../ui/card"
import TypesMapper from "./ResistanceMapper"

interface EvolutionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  evolutionId: string;
  key: number;
  active?: boolean;
}

/**
 * Tarjeta de evolución de un pokemon
 * @param evolutionId ID del pokemon
 * @param key Llave de la lista de evoluciones la cual indica el indice de la evolución en la lista.
 * @param active Indica si la tarjeta esta activa para mostrarla de forma diferente.
 * @param props Propiedades del componente usando de base las propiedades de un div de React.
 * @returns JSX
 */
const EvolutionCard: React.FC<EvolutionCardProps> = ({ evolutionId, key, active, ...props }) => {

  const dispatch = useAppDispatch()


  const { data: pokemonData, error, isLoading, refetch } = useGetPokemonByidQuery(evolutionId ?? '')

  if (isLoading) return <PokeballSpinner variant='pokemon' />
  if (error) {
    refetch()
    return <p>Error</p>
  }
  const gradient = gradientMaker(pokemonData?.types[0], pokemonData?.types[1], true)
  const pokemonId = pokemonData?.id
  const pokedexNumber = pokemonData?.nationalPokedexNumber
  const pokemonName = pokemonData?.name.split('-').map((word: string) => capitalizer(word)).join(' ') as string
  const pokemonMainImage = pokemonData?.img
  const generationStrings = pokemonData?.generation && pokemonData?.generation.split("-")
  const pokemonGeneration = generationStrings && generationStrings[1]?.toUpperCase()
  const typesList = pokemonData?.types
  const evolutionChain = pokemonData?.evolutionChain as Pokemon[]

  return (
    <Card key={pokedexNumber} className={`flex flex-col items-center justify-between h-full p-2 border-black ${active && "transform scale-110"}`} style={gradient} {...props} >

      {generationStrings &&
        <Badge variant='default' className='w-4/5 flex justify-center '  >
          <CardDescription className=' text-white' >Gen. {pokemonGeneration}</CardDescription>
        </Badge>
      }

      <div className="flex items-center mt-1">
        <TypesMapper dmgMapper={typesList} listBoxClass='justify-center' badgeClass="mr-0" />
      </div>

      <Link href={`/${pokemonId}`} onClick={() => dispatch(setSelectedPokemon(pokemonData))} >
        <ImageDisplayer src={pokemonMainImage} alt={pokemonName} className="w-16 h-16 object-contain" />
        <span className="text-sm font-semibold">
          N°{pokedexNumber}
          <br />
          {pokemonName}
        </span>
        {key < evolutionChain.length - 1 ?
          <MoveRight />
          :
          <div>&nbsp;</div>
        }
      </Link>

    </Card>

  )
}



export default EvolutionCard