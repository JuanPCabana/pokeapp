import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import {
  Generations,
  Pokemon,
  PokemonQuery,
  PokemonTypes,
} from "@/utils/types/pokemonTypes";
import { urls } from "@/utils/constants";
import { isValidGeneration, isValidPokemonType } from "@/utils/validators";

//endpoint para listar todos los pokemones

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit") || "10000";
  const offset = searchParams.get("offset") || "0";
  const generation = searchParams.get("generation") || "";
  const type = searchParams.get("type") || "";

  try {
    return getPokemonList(
      limit,
      offset,
      generation as Generations,
      type as PokemonTypes
    );
  } catch (error) {
    console.error("Error fetching data from PokéAPI:", error);
    return NextResponse.json(
      { error: "Failed to fetch Pokémon data" },
      { status: 500 }
    );
  }
}

const getPokemonList = async (
  limit: string,
  offset: string,
  generation: Generations,
  type: PokemonTypes
) => {
  if (generation || type) {
    if (generation && !isValidGeneration(generation)) {
      return NextResponse.json(
        { error: "Pokemon gen not valid" },
        { status: 400 }
      );
    }

    if (type && !isValidPokemonType(type)) {
      return NextResponse.json(
        { error: "Pokemon type not valid" },
        { status: 400 }
      );
    }

    const getPokemonsByType: () => Promise<Pokemon[]> = async () => {
      const { data: pokemonTypeResponse } = await axios.get(
        `${urls.POKEMON_TYPE_URL}/${type}/`
      );
      return pokemonTypeResponse.pokemon.map((p: { pokemon: Pokemon }) => {
        return {
          id: p.pokemon.url.split("/")[6],
          name: p.pokemon.name,
          url: p.pokemon.url,
        };
      });
    };

    const getPokemonsByGen: () => Promise<Pokemon[]> = async () => {
      const { data: pokemonByGenerationResponse } = await axios.get(
        `${urls.POKEMON_GENERATION_URL}/${generation}/`
      );
      return pokemonByGenerationResponse.pokemon_species.map((p: Pokemon) => {
        return {
          id: p.url.split("/")[6],
          name: p.name,
          url: p.url,
        };
      });
    };

    const pokemonsByType = type && (await getPokemonsByType());
    const pokemonsByGen = generation && (await getPokemonsByGen());

    const filteredPokemon =
      type &&
      generation &&
      pokemonsByType.filter((pokemon) =>
        pokemonsByGen.some((genPokemon) => genPokemon.id === pokemon.id)
      );

    let pokemonList: Pokemon[] = [];

    if (type && generation) {
      pokemonList = filteredPokemon;
    } else if (!type) {
      pokemonList = pokemonsByGen;
    } else if (!generation) {
      pokemonList = pokemonsByType;
    }

    pokemonList = pokemonList.toSorted(
      (a, b) => parseInt(a.id) - parseInt(b.id)
    );

    const returnObj = {
      count: pokemonList.length,
      next: null,
      previous: null,
      results: pokemonList,
    };

    return NextResponse.json(returnObj);
  } else {
    const { data: pokemonDetails } = await axios.get<PokemonQuery>(
      `${urls.POKEMON_LIST_URL}?limit=${limit}&offset=${offset}`
    );

    const returnList = pokemonDetails.results.map((pokemon) => ({
      id: pokemon.url.split("/")[6],
      name: pokemon.name,
      url: pokemon.url,
    }));

    const returnObj = {
      count: pokemonDetails.count,
      next: pokemonDetails.next,
      previous: pokemonDetails.previous,
      results: returnList.toSorted((a, b) => parseInt(a.id) - parseInt(b.id)),
    };
    return NextResponse.json(returnObj);
  }
};
