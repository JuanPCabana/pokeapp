import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import {
  FullPokemonData,
  PokedexIface,
  PokemonInfo,
  PokemonStatsIface,
  PokemonTypeIface,
} from "@/utils/types/pokemonTypes";
import evolutionChainFormatter from "@/utils/evolutionChainFormatter";
import { getTypesEffectiveness } from "@/utils/effectivenessCalculator";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pokemonId = params.id;

    const basePath = "https://pokeapi.co/api/v2";

    const { data: pokemonDetails } = await axios.get<PokemonInfo>(
      `${basePath}/pokemon/${pokemonId}`
    );

    if (!pokemonDetails) {
      return NextResponse.json({ error: "Pokémon not found" }, { status: 404 });
    }

    const { data: specieDetails } = await axios.get(pokemonDetails.species.url);

    const { data: evolutionDetails } = await axios.get(
      specieDetails.evolution_chain.url
    );

    const typesList = pokemonDetails?.types.map((type) => type.type.name);
    const resistances = getTypesEffectiveness(typesList, "defending");

    // Formatear la respuesta como la necesitas
    const formattedData: FullPokemonData = {
      id: pokemonDetails.id.toString(),
      name: pokemonDetails.name,
      img: pokemonDetails.sprites.front_default ?? "",
      stats: pokemonDetails.stats.map((stat: PokemonStatsIface) => ({
        name: stat.stat.name,
        value: stat.base_stat,
        effort: stat.effort,
      })),
      types: pokemonDetails.types.map(
        (type: PokemonTypeIface) => type.type.name
      ),
      generation: specieDetails?.generation?.name ?? "",
      habitat: specieDetails?.habitat?.name ?? "",
      nationalPokedexNumber:
        specieDetails?.pokedex_numbers.find(
          (pokedexNumber: PokedexIface) =>
            pokedexNumber.pokedex?.name === "national"
        )?.entry_number ?? "",
      evolutionChain:
        evolutionDetails?.chain &&
        evolutionChainFormatter(evolutionDetails?.chain),
      resistances,
    };

    // Enviar respuesta formateada al cliente
    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error fetching data from PokéAPI:", error);
    return NextResponse.json(
      { error: "Failed to fetch Pokémon data" },
      { status: 500 }
    );
  }
}
