import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface PokemonQuery {
  count: number;
  next: string;
  previous: string;
  results: { name: string; url: string }[];
}

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
  }),
});

export const { useGetPokemonsQuery } = pokemonApi;
