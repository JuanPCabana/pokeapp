import updatePage from "@/utils/pageUpdater";
import {
  FullPokemonData,
  Generations,
  Pokemon,
  PokemonTypes,
} from "@/utils/types/pokemonTypes";
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
  typeFilter: PokemonTypes | "none";
  generationFilter: Generations | "none";
  selectedPokemon: FullPokemonData | null;
  refetchTrigger: boolean;
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
  typeFilter: "none",
  generationFilter: "none",
  refetchTrigger: false,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    /**
     * Setea la lista completa de pokemones
     * @param action en el payload se espera un array de pokemones
     */
    setFullPokemonList: (state, action) => {
      state.fullPokemonList = action.payload;
      state.maxPage = Math.ceil(state.fullPokemonList.length / state.limit);
      state.filterPokemonList = state.fullPokemonList;
    },
    /**
     * Setea la lista de pokemones a mostrar
     * @param action en el payload se espera un objeto con las propiedades limit y offset
     * @returns
     */
    setDisplayPokemonList: (state, action) => {
      const { limit, offset } = action.payload;
      state.displayPokemonList = state.fullPokemonList.slice(
        offset,
        offset + limit
      );
    },
    /**
     * Agrega la información completa de un pokemon a la lista de datos de pokemones
     * @param action en el payload se espera un objeto de tipo FullPokemonData
     */
    pushPokemonInfo: (state, action) => {
      const pokemon = action.payload;
      const pokemonIndex = state.pokemonDataList.findIndex(
        (p) => p.id === pokemon.id
      );

      if (pokemonIndex === -1) {
        state.pokemonDataList.push(pokemon);
      } else {
        state.pokemonDataList[pokemonIndex] = pokemon;
      }
    },

    /**
     * Setea la página actual de la lista de pokemones
     * @param action en el payload se espera un número entero
     */
    setPage: (state, action) => {
      const newPage = action.payload;
      if (newPage > 0 && newPage <= state.maxPage) {
        state.page = newPage;
        state.offset = (newPage - 1) * state.limit;
        state.displayPokemonList = state.filterPokemonList.slice(
          state.offset,
          state.offset + state.limit
        );
      }
    },
    /**
     * Setea la página siguiente de la lista de pokemones
     * @returns
     */
    setNextPokemonPage: (state) => updatePage(state, 1),
    /**
     * Setea la página anterior de la lista de pokemones
     * @returns
     */
    setPreviousPokemonPage: (state) => updatePage(state, -1),
    /**
     * Setea la cadena de búsqueda de la lista de pokemones y actualiza la lista de pokemones a mostrar
     * @param action en el payload se espera un string con el nombre del pokemon o su id
     * @returns
     */
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
            pokemon.id == state.searchQuery ||
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
    /**
     * Setea el filtro por tipo de la lista de pokemones y actualiza la lista de pokemones a mostrar
     * @param action en el payload se espera un string con el tipo de pokemon
     * @returns
     */
    setTypeFilter: (state, action) => {
      state.typeFilter = action.payload;
      state.page = 1;
      state.offset = 0;
    },
    /**
     * Setea el filtro por generación de la lista de pokemones y actualiza la lista de pokemones a mostrar
     * @param action en el payload se espera un string con la generación del pokemon
     * @returns
     */
    setGenerationFilter: (state, action) => {
      state.generationFilter = action.payload;
      state.page = 1;
      state.offset = 0;
    },
    /**
     * Resetea los filtros de la lista de pokemones, actualiza la lista de pokemones a mostrar, borra el searchQuery y reinicia la página
     * @returns
     */
    resetFilters: (state) => {
      state.typeFilter = "none";
      state.generationFilter = "none";
      state.searchQuery = "";
      state.page = 1;
      state.offset = 0;
      state.filterPokemonList = [...state.fullPokemonList];
      state.maxPage = Math.ceil(state.fullPokemonList.length / state.limit);
      state.displayPokemonList = state.fullPokemonList.slice(0, state.limit);
    },
    /**
     * Setea el pokemon seleccionado para guardar su información completa y mostrarla en la vista de detalle
     * @param action en el payload se espera un objeto de tipo FullPokemonData
     */
    setSelectedPokemon: (state, action) => {
      state.selectedPokemon = action.payload;
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
  setTypeFilter,
  setGenerationFilter,
  resetFilters,
  setSelectedPokemon,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
