"use client";
import React from 'react'
import Image from 'next/image'
import { useAppSelector } from '@/redux/hooks'
import Pokeball from '@/public/img/pokeball.svg'
import { POKEMON_EGG_GROUPS_TRADUCTION, POKEMON_HABITAT_TRADUCTION, POKEMON_STATS_TRADUCTION } from '@/utils/constants';
import { Progress } from '@/components/ui/progress';
import { getColorByType, gradientMaker } from '@/utils/gradientMaker';
import capitalizer from '@/utils/capitalizer';
import PokemonTypeIcon from '@/components/misc/PokemonTypeIcon';
import getPokemonTypeName from '@/utils/getPokemonTypeName';
import { Badge } from '@/components/ui/badge';
import { EffectivenessIface } from '@/utils/types/pokemonTypes';
import ResistanceMapper from '@/components/Pokemon/ResistanceMapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetPokemonByidQuery } from '@/redux/services/pokemonApi';
import EvolutionCard from '@/components/Pokemon/EvolutionCard';
import { ArrowLeft, Egg, Mountain } from 'lucide-react';
import { useRouter } from 'next/router';
import { Separator } from '@/components/ui/separator';
import PokeballSpinner from '@/components/misc/PokeballSpinner';
import Link from 'next/link';

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
  console.log("🚀 ~ PokemonDetails ~ data:", data)

  const gradient = gradientMaker(pokemonData?.types[0], pokemonData?.types[1])
  const generationStrings = (pokemonData?.generation && pokemonData?.generation.split("-")) ?? (['', ''])
  const x0Dmg = pokemonData?.resistances.x0dmg
  const quarterDmg = pokemonData?.resistances.quarterdmg
  const halfDmg = pokemonData?.resistances.halfdmg
  const x2Dmg = pokemonData?.resistances.x2dmg
  const x4Dmg = pokemonData?.resistances.x4dmg

  if (isLoading) return (
    <div className=' justify-center items-center'>
      <PokeballSpinner variant='main' />
    </div>
  )
  if (error) {
    refetch()
    return <p>Error</p>
  }
  return (
    pokemonData &&
    <Card className="w-full max-w-4xl mx-auto my-3" style={gradient} >

      <CardHeader className="flex flex-row justify-between items-center">
        <div className='flex justify-start items-center'>
          <Link href='/'>
            <ArrowLeft className='mr-5' />
          </Link>
          <CardTitle className="text-3xl font-bold">{capitalizer(pokemonData.name)}</CardTitle>
        </div>
        <div className="text-xl font-semibold text-end">N° Pokedex Nacional: {pokemonData.nationalPokedexNumber}</div>
      </CardHeader>

      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              {pokemonData.img ?
                <Image width={100} height={100} src={pokemonData.img} alt={pokemonData.name} priority={true} className='w-full h-full' />
                :
                <div className='w-full h-full flex justify-center items-center'>
                  <Pokeball className='w-3/4 h-3/4' />
                </div>
              }
              <div>
                <h3 className="text-lg font-semibold mb-2">Tipos</h3>
                <div className="flex gap-2">
                  <ResistanceMapper dmgMapper={pokemonData.types} />

                </div>
              </div>
            </div>
            <Separator className='bg-black' />
            <div>
              <h3 className="text-lg font-semibold mb-2">Resistencias</h3>
              <div className="grid grid-cols-2 gap-8">

                {x0Dmg &&
                  <ResistanceMapper dmgMapper={x0Dmg} title={`${0}`} />
                }
                {quarterDmg &&
                  <ResistanceMapper dmgMapper={quarterDmg} title={0.25} />
                }
                {halfDmg &&
                  <ResistanceMapper dmgMapper={halfDmg} title={0.5} />
                }
                {x2Dmg &&
                  <ResistanceMapper dmgMapper={x2Dmg} title={2} />
                }
                {x4Dmg &&
                  <ResistanceMapper dmgMapper={x4Dmg} title={4} />
                }
              </div>
            </div>
            <Separator className='bg-black' />

            <div>
              <h3 className="text-lg font-semibold mb-2">Estadísticas</h3>
              {pokemonData.stats.map((stat) => (
                <div key={stat.name} className="flex items-center gap-2 mb-2">
                  <span className="w-32 text-sm">{POKEMON_STATS_TRADUCTION[stat.name]}</span>
                  {/* <Progress value={stat.value} max={255} className="w-full" /> */}
                  <Progress style={gradient} value={stat.value} className='bg-slate-500 border-solid border-black border-2' />

                  <span className="w-8 text-sm text-right">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 ">Evolution Chain</h3>
              {/* <div className="flex justify-between items-start"> */}
              <div className="grid grid-cols-3 gap-3">
                {pokemonData.evolutionChain.map((pokemon, index) => (

                  <EvolutionCard key={index} evolutionId={pokemon.id} index={index} active={pokemonData.id === pokemon.id} />
                ))}
              </div>
            </div>
            <Separator className='bg-black' />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Generación</h3>
                <Badge variant="default">{capitalizer(generationStrings[0])} {generationStrings[1].toUpperCase()}</Badge>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Habitat</h3>
                <Badge variant="default" className="flex items-center gap-1">
                  <Mountain className="w-4 h-4" />
                  {POKEMON_HABITAT_TRADUCTION[pokemonData.habitat] ?? 'Desconocido'}
                </Badge>
              </div>
            </div>
            <Separator className='bg-black' />
            <div>
              <h3 className="text-lg font-semibold mb-2">Egg Group</h3>
              <div className="flex gap-2">
                {pokemonData.eggGroups.map((group) => (
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
              {pokemonData.shinyImg ?
                <Image width={100} height={100} src={pokemonData.shinyImg} alt={pokemonData.name} priority={true} className='w-full h-full' />
                :
                <div className='w-full h-full flex justify-center items-center'>
                  <Pokeball className='w-3/4 h-3/4' />
                </div>
              }
              {/* <img src={pokemonData.shinyImg} alt={`Shiny ${pokemonData.name}`} className="w-40 h-40 object-contain" /> */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card >
    //</div>
  )
}



export default PokemonDetails
