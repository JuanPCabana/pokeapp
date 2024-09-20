import { Pokemon } from "@/utils/types/pokemonTypes";
import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  fullPokemonList: Pokemon[];
  displayPokemonList: Pokemon[];
  selectedPokemon: any;
  page: number;
  limit: number;
  offset: number;
  maxPage: number;
}

const initialState: initialStateType = {
  fullPokemonList: [],
  displayPokemonList: [],
  selectedPokemon: null,
  page: 1,
  limit: 12,
  offset: 0,
  maxPage: 1,
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
      state.displayPokemonList = state.fullPokemonList.slice(
        state.offset,
        state.offset + state.limit
      );
    },
    setNextPokemonPage: (state) => {
      state.page += 1;
      state.offset = (state.page - 1) * state.limit;
      state.displayPokemonList = state.fullPokemonList.slice(
        state.offset,
        state.offset + state.limit
      );
    },
    setPreviousPokemonPage: (state) => {
      state.page -= 1;
      if (state.page < 1) state.page = 1;
      state.offset = (state.page - 1) * state.limit;
      state.displayPokemonList = state.fullPokemonList.slice(
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
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
