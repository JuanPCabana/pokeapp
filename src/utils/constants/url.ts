const BASE_URL = "https://pokeapi.co/api/v2";
const POKEMON_LIST_URL = `${BASE_URL}/pokemon`;
const POKEMON_DETAIL_URL = `${BASE_URL}/pokemon`;
const POKEMON_SPECIE_URL = `${BASE_URL}/pokemon-species`;
const POKEMON_EVOLUTION_CHAIN_URL = `${BASE_URL}/evolution-chain`;
const POKEMON_TYPE_URL = `${BASE_URL}/type`;
const POKEMON_GENERATION_URL = `${BASE_URL}/generation`;

const urls = Object.freeze({
  POKEMON_LIST_URL,
  POKEMON_DETAIL_URL,
  POKEMON_EVOLUTION_CHAIN_URL,
  POKEMON_GENERATION_URL,
  POKEMON_SPECIE_URL,
  POKEMON_TYPE_URL,
});

export default urls;
