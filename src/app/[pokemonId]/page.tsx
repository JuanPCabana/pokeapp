"use client";
import React from 'react'
import Image from 'next/image'
import { useAppSelector } from '@/redux/hooks'
import Pokeball from '@/public/img/pokeball.svg'
import { POKEMON_EGG_GROUPS_TRADUCTION, POKEMON_HABITAT_TRADUCTION, POKEMON_STATS_TRADUCTION } from '@/utils/constants';
import { Progress } from '@/components/ui/progress';
import { gradientMaker } from '@/utils/gradientMaker';
import capitalizer from '@/utils/capitalizer';
import PokemonTypeIcon from '@/components/misc/PokemonTypeIcon';
import getPokemonTypeName from '@/utils/getPokemonTypeName';
import { Badge } from '@/components/ui/badge';
import { EffectivenessIface } from '@/utils/types/pokemonTypes';
import ResistanceMapper from '@/components/Pokemon/ResistanceMapper';

const PokemonDetails = () => {

  const pokemonData = useAppSelector(state => state.pokemonReducer.selectedPokemon)
  const gradient = gradientMaker(pokemonData?.types[0], pokemonData?.types[1])
  const generationStrings = (pokemonData?.generation && pokemonData?.generation.split("-")) ?? (['', ''])
  const x0Dmg = pokemonData?.resistances.x0dmg
  const quarterDmg = pokemonData?.resistances.quarterdmg
  const halfDmg = pokemonData?.resistances.halfdmg
  const x2Dmg = pokemonData?.resistances.x2dmg
  const x4Dmg = pokemonData?.resistances.x4dmg

  return (
    pokemonData &&
    <div className='w-4/5 flex-col justify-center items-center m-h-[75vh] mt-3'>
      <div className='grid grid-cols-2 gap-4' >
        <div>
          <h1 className='text-4xl font-bold text-center'>{capitalizer(pokemonData?.name ?? '')}</h1>
          <div className='flex justify-center'>
            {pokemonData?.img ?
              <div className='w-full h-full flex justify-center items-center'>
                <Image width={100} height={100} src={pokemonData.img} alt={pokemonData.name} priority={true} className='w-1/4 h-1/4' />
              </div>
              :
              <div className='w-full h-full flex justify-center items-center'>
                <Pokeball className='w-1/4 h-1/4' />
              </div>
            }
          </div>

          <h2 className='text-2xl font-bold'>Tipos</h2>

          <ResistanceMapper dmgMapper={pokemonData.types} />

          <h2 className='text-2xl font-bold'>Resistances</h2>

          <ResistanceMapper dmgMapper={x0Dmg} title='(X0)' />

          <ResistanceMapper dmgMapper={quarterDmg} title='(X1/4)' />

          <ResistanceMapper dmgMapper={halfDmg} title='(X1/2)' />

          <ResistanceMapper dmgMapper={x2Dmg} title='(X2)' />

          <ResistanceMapper dmgMapper={x4Dmg} title='(X4)' />



          <h2 className='text-2xl font-bold'>Stats</h2>
          <ul>
            {pokemonData?.stats.map((stat, index) => {
              return (
                <li key={index} className='flex whitespace-nowrap'>
                  <div className='grid grid-cols-1 gap-1 w-full'>
                    {POKEMON_STATS_TRADUCTION[stat.name]} ({stat.value}):
                    <Progress style={gradient} value={stat.value} className='bg-slate-500' />
                  </div>
                </li>
              )

            })}

          </ul>

        </div>

        <div>

          <h2 className='text-2xl font-bold'>N° Pokedex Nacional: {pokemonData.nationalPokedexNumber}</h2>

          <h2 className='text-2xl font-bold'>Evolution Chain</h2>
          <ul>
            {pokemonData.evolutionChain.map((evolution, index) => (
              <li key={index}>
                {evolution.name}
              </li>
            ))}
          </ul>

          <h2 className='text-2xl font-bold'>Generation</h2>
          <p>Gen. {generationStrings[1]?.toUpperCase()}</p>

          <h2 className='text-2xl font-bold'>Habitat</h2>
          <p>{POKEMON_HABITAT_TRADUCTION[pokemonData.habitat]}</p>

          <h3 className='text-xl font-bold'>Egg Group</h3>
          <ul>
            {pokemonData.eggGroups.map((eggGroup, index) => (
              <li key={index}>
                {POKEMON_EGG_GROUPS_TRADUCTION[eggGroup]}
              </li>
            ))}
          </ul>



        </div>
      </div>
    </div >
  )
}

export default PokemonDetails