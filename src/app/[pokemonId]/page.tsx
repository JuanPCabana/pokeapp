"use client";
import ImageDisplayer from '@/components/misc/ImageDisplayer';
import PokeballSpinner from '@/components/misc/PokeballSpinner';
import EvolutionCard from '@/components/Pokemon/EvolutionCard';
import ResistanceDetails from '@/components/Pokemon/ResistanceDetails';
import TypesMapper from '@/components/Pokemon/ResistanceMapper';
import StatsMapper from '@/components/Pokemon/StatsMapper';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAppSelector } from '@/redux/hooks';
import { useGetPokemonByidQuery } from '@/redux/services/pokemonApi';
import capitalizer from '@/utils/capitalizer';
import { POKEMON_EGG_GROUPS_TRADUCTION, POKEMON_HABITAT_TRADUCTION } from '@/utils/constants';
import { gradientMaker } from '@/utils/gradientMaker';
import { ShortStatsIface } from '@/utils/types/pokemonTypes';
import { ArrowLeft, Egg, Mountain } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

/* Pagina de detalles de un pokemon */

interface PokemonDetailsProps {
  params: {
    pokemonId: string
  }
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ params }) => {
  const { pokemonId } = params
  const storedPokemonData = useAppSelector(state => state.pokemonReducer.selectedPokemon)
  const { data, error, isLoading, refetch } = useGetPokemonByidQuery(pokemonId as string)


  const pokemonData = storedPokemonData ?? data


  if (isLoading) return (
    <div className=' justify-center items-center'>
      <PokeballSpinner variant='main' />
    </div>
  )
  if (error) {
    refetch()
    return <p>Error</p>
  }

  const gradient = gradientMaker(pokemonData?.types[0], pokemonData?.types[1])
  const pokemonName = pokemonData?.name.split('-').map((word: string) => capitalizer(word)).join(' ') as string
  const pokedexNumber = pokemonData?.nationalPokedexNumber
  const pokemonMainImage = pokemonData?.img
  const shinyImage = pokemonData?.shinyImg
  const typesList = pokemonData?.types
  const pokemonStats = pokemonData?.stats
  const generationStrings = pokemonData?.generation && pokemonData?.generation.split("-")
  const pokemonGeneration = generationStrings && generationStrings[1].toUpperCase()
  const habitat = pokemonData?.habitat as string
  const eggGroups = pokemonData?.eggGroups as string[]

  return (
    pokemonData &&
    <Card className="w-full max-w-4xl mx-auto my-3" style={gradient} >

      <CardHeader className="flex flex-row justify-between items-center">
        <div className='flex justify-start items-center'>
          <Link href='/'>
            <ArrowLeft className='mr-5' />
          </Link>
          <CardTitle className="text-3xl font-bold">{pokemonName}</CardTitle>
        </div>
        <div className="text-xl font-semibold text-end">N° Pokedex Nacional: {pokedexNumber}</div>
      </CardHeader>

      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">

            <div className="flex justify-between items-center">
              <ImageDisplayer src={pokemonMainImage} alt={pokemonName} />
              <div>
                <h3 className="text-lg font-semibold mb-2">Tipos</h3>
                <div className="flex gap-2">
                  <TypesMapper dmgMapper={typesList} />

                </div>
              </div>
            </div>

            <Separator className='bg-black' />

            <div>
              <h3 className="text-lg font-semibold mb-2">Resistencias</h3>
              <div className="grid grid-cols-2 gap-8">
                <ResistanceDetails resistanceData={pokemonData.resistances} />
              </div>
            </div>

            <Separator className='bg-black' />

            <div>
              <h3 className="text-lg font-semibold mb-2">Estadísticas</h3>
              <StatsMapper color={gradient} statsList={pokemonStats as ShortStatsIface[]} />
            </div>
          </div>

          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold mb-2 ">Evoluciones</h3>
              <div className="grid grid-cols-3 gap-3">
                {pokemonData.evolutionChain.map((pokemon, index) => (
                  <EvolutionCard key={index} evolutionId={pokemon.id} active={pokemonId === pokemon.id} />
                ))}
              </div>
            </div>

            <Separator className='bg-black' />

            <div className="grid grid-cols-2 gap-4">

              <div>
                <h3 className="text-lg font-semibold mb-2">Generación</h3>
                <Badge variant="default">Generación {pokemonGeneration}</Badge>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Habitat</h3>
                <Badge variant="default" className="flex items-center gap-1">
                  <Mountain className="w-4 h-4" />
                  {POKEMON_HABITAT_TRADUCTION[habitat] ?? 'Desconocido'}
                </Badge>
              </div>

            </div>

            <Separator className='bg-black' />

            <div>
              <h3 className="text-lg font-semibold mb-2">Grupo Huevo</h3>
              <div className="flex gap-2">
                {eggGroups.map((group) => (
                  <Badge key={group} variant="default" className="flex items-center gap-1">
                    <Egg className="w-4 h-4" />
                    {POKEMON_EGG_GROUPS_TRADUCTION[group] ?? 'Desconocido'}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator className='bg-black' />

            <div>
              <h3 className="text-lg font-semibold mb-2">Version Shiny</h3>
              <ImageDisplayer src={shinyImage} alt={`shiny ${pokemonName}`} />
            </div>

          </div>
        </div>
      </CardContent>
    </Card >
  )
}



export default PokemonDetails
