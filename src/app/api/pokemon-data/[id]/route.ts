import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import {
  FullPokemonData,
  PokedexIface,
  Pokemon,
  PokemonInfo,
  PokemonStatsIface,
  PokemonTypeIface,
} from "@/utils/types/pokemonTypes";
import evolutionChainFormatter from "@/utils/evolutionChainFormatter";
import { getTypesEffectiveness } from "@/utils/effectivenessCalculator";
import { urls } from "@/utils/constants";

// Endpoint para traer todos los detalles de 1 pokemon y mapear la respuesta a voluntad

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pokemonId = params.id;

    // Fetchear los detalles del pokemon

    const { data: pokemonDetails } = await axios.get<PokemonInfo>(
      `${urls.POKEMON_DETAIL_URL}/${pokemonId}`
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

    // Formatear la respuesta
    const formattedData: FullPokemonData = {
      id: pokemonDetails.id.toString(),
      name: pokemonDetails.name,
      img: pokemonDetails.sprites.front_default ?? "",
      shinyImg: pokemonDetails.sprites.front_shiny ?? "",
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
      eggGroups: specieDetails?.egg_groups.map(
        (eggGroup: Pokemon) => eggGroup.name
      ),
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
