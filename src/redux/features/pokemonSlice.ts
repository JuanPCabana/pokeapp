import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemons: [],
  loading: false,
  error: null,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    fetchPokemonStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPokemonSuccess(state, action) {
      state.loading = false;
      state.pokemons = action.payload;
    },
    fetchPokemonFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchPokemonStart, fetchPokemonSuccess, fetchPokemonFailure } =
  pokemonSlice.actions;

export default pokemonSlice.reducer;
