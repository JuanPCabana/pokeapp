import { PokemonInfo, PokemonQuery } from "@/utils/types/pokemonTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemons: builder.query<PokemonQuery, { limit: number; offset: number }>(
      {
        query: ({ limit = 10000, offset = 0 }) =>
          `pokemon?limit=${limit}&offset=${offset}`,
      }
    ),
    getPokemonByid: builder.query<PokemonInfo, string>({
      query: (id) => `pokemon/${id}`,
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonByidQuery } = pokemonApi;
