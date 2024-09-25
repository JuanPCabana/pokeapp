import { Pokemon } from "./types/pokemonTypes";

interface State {
  page: number;
  limit: number;
  offset: number;
  maxPage: number;
  filterPokemonList: Pokemon[];
  displayPokemonList: Pokemon[];
}

/**
 * Actualiza la página de la lista de pokemones.
 *
 * @param state - Estado de la aplicación.
 * @param direction - Dirección en la que se moverá la página (1 o -1) .
 */
const updatePage = (state: State, direction: number) => {
  const newPage = state.page + direction;
  if (newPage > 0 && newPage < state.maxPage) {
    state.page = newPage;
    state.offset = (newPage - 1) * state.limit;
    state.displayPokemonList = state.filterPokemonList.slice(
      state.offset,
      state.offset + state.limit
    );
  }
};

export default updatePage;
