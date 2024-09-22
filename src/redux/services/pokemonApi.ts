import makeQueryParams from "@/utils/makeQueryParams";
import {
  FullPokemonData,
  Generations,
  PokemonQuery,
  PokemonTypes,
} from "@/utils/types/pokemonTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetPokemonsIface {
  limit: number;
  offset: number;
  type: PokemonTypes | "none";
  generation: Generations | "none";
}

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getPokemons: builder.query<PokemonQuery, GetPokemonsIface>({
      query: ({ limit = 10000, offset = 0, type, generation }) =>
        `pokemon-data?${makeQueryParams({ limit, offset, type, generation })}`,
    }),
    getPokemonByid: builder.query<FullPokemonData, string>({
      query: (id) => `pokemon-data/${id}`,
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonByidQuery } = pokemonApi;
