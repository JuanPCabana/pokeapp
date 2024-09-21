import { Pokemon } from "@/utils/types/pokemonTypes";
import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  fullPokemonList: Pokemon[];
  displayPokemonList: Pokemon[];
  filterPokemonList: Pokemon[];
  selectedPokemon: any;
  page: number;
  limit: number;
  offset: number;
  maxPage: number;
  searchQuery: string;
  typeFilter: string;
  generationFilter: string;
}

const initialState: initialStateType = {
  fullPokemonList: [],
  displayPokemonList: [],
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
    },
    setDisplayPokemonList: (state, action) => {
      const { fullList, limit, offset } = action.payload;
      state.displayPokemonList = fullList.slice(offset, offset + limit);
    },
    setPokemonInfo: (state, action) => {
      state.selectedPokemon = action.payload;
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
        state.filterPokemonList = state.fullPokemonList.filter(
          (pokemon) =>
            pokemon.name.includes(state.searchQuery) ||
            pokemon.url.split("/").reverse()[1].includes(state.searchQuery)
        );
        state.displayPokemonList = state.filterPokemonList.slice(
          state.offset,
          state.offset + state.limit
        );
        state.maxPage = Math.ceil(state.filterPokemonList.length / state.limit);
      }
    },
  },
});

export const {
  setFullPokemonList,
  setDisplayPokemonList,
  setNextPokemonPage,
  setPreviousPokemonPage,
  setPage,
  setPokemonInfo,
  setSearchQuery,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
