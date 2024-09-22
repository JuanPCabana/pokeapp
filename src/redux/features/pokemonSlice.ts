import { FullPokemonData, Pokemon } from "@/utils/types/pokemonTypes";
import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  fullPokemonList: Pokemon[];
  pokemonDataList: FullPokemonData[];
  displayPokemonList: Pokemon[];
  filterPokemonList: Pokemon[];
  page: number;
  limit: number;
  offset: number;
  maxPage: number;
  searchQuery: string;
  typeFilter: string;
  generationFilter: string;
  selectedPokemon: FullPokemonData | null;
}

const initialState: initialStateType = {
  fullPokemonList: [],
  displayPokemonList: [],
  pokemonDataList: [],
  filterPokemonList: [],
  selectedPokemon: null,
  page: 1,
  limit: 12,
  offset: 0,
  maxPage: 1,
  searchQuery: "",
  typeFilter: "",
  generationFilter: "",
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setFullPokemonList: (state, action) => {
      state.fullPokemonList = action.payload;
      state.maxPage = Math.ceil(state.fullPokemonList.length / state.limit);
      state.filterPokemonList = state.fullPokemonList;
    },
    setDisplayPokemonList: (state, action) => {
      const { fullList, limit, offset } = action.payload;
      state.displayPokemonList = fullList.slice(offset, offset + limit);
    },
    pushPokemonInfo: (state, action) => {
      const pokemon = action.payload;
      const pokemonList = state.pokemonDataList;
      const pokemonIndex = pokemonList.findIndex((p) => p.id === pokemon.id);
      if (pokemonIndex === -1) {
        pokemonList.push(pokemon);
      } else {
        pokemonList[pokemonIndex] = pokemon;
      }
      state.pokemonDataList = pokemonList;
    },
    setPage: (state, action) => {
      state.page = action.payload;
      state.offset = (state.page - 1) * state.limit;
      state.displayPokemonList = state.filterPokemonList.slice(
        state.offset,
        state.offset + state.limit
      );
    },
    setNextPokemonPage: (state) => {
      state.page += 1;
      state.offset = (state.page - 1) * state.limit;
      state.displayPokemonList = state.filterPokemonList.slice(
        state.offset,
        state.offset + state.limit
      );
    },
    setPreviousPokemonPage: (state) => {
      state.page -= 1;
      if (state.page < 1) state.page = 1;
      state.offset = (state.page - 1) * state.limit;
      state.displayPokemonList = state.filterPokemonList.slice(
        state.offset,
        state.offset + state.limit
      );
    },
    setSearchQuery: (state, action) => {
      if (action.payload === "") {
        state.displayPokemonList = state.fullPokemonList.slice(
          state.offset,
          state.offset + state.limit
        );
        state.searchQuery = action.payload;
        state.page = 1;
        state.offset = 0;
        state.filterPokemonList = state.fullPokemonList;
        state.maxPage = Math.ceil(state.filterPokemonList.length / state.limit);
      } else {
        state.searchQuery = action.payload;
        state.page = 1;
        state.offset = 0;

        const pokemonDataList = state.pokemonDataList
          .filter((pokemon) => {
            return pokemon.name.includes(state.searchQuery);
          })
          .map((pokemon) => pokemon.evolutionChain.map((evo) => evo.name))
          .flat();
        const fullListFiltered = state.fullPokemonList.filter(
          (pokemon) =>
            pokemon.name.includes(state.searchQuery) ||
            pokemon.id.includes(state.searchQuery) ||
            pokemonDataList.includes(pokemon.name)
        );

        state.filterPokemonList = fullListFiltered;

        state.displayPokemonList = state.filterPokemonList.slice(
          state.offset,
          state.offset + state.limit
        );
        state.maxPage = Math.ceil(state.filterPokemonList.length / state.limit);
      }
    },
    reloadDisplayPokemonList: (state) => {
      state.displayPokemonList = state.filterPokemonList.slice(
        state.offset,
        state.offset + state.limit
      );
    },
  },
});

export const {
  setFullPokemonList,
  setDisplayPokemonList,
  setNextPokemonPage,
  setPreviousPokemonPage,
  setPage,
  pushPokemonInfo,
  setSearchQuery,
  reloadDisplayPokemonList,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
