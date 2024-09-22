import { EvoChainIface, Pokemon } from "./types/pokemonTypes";

const evolutionChainFormatter: (
  chain: EvoChainIface,
  addCurrent?: boolean
) => Pokemon[] = (chain, addCurrent = true) => {
  const finalChain: Pokemon[] = [];
  let finalInnerChain: Pokemon[] = [];

  if (addCurrent) {
    finalChain.push({
      name: chain.species.name,
      url: chain.species.url,
      id: chain.species.url.split("/")[6],
    });
  }

  if (chain.evolves_to.length > 0) {
    for (const innerChain of chain.evolves_to) {
      finalChain.push({
        name: innerChain.species.name,
        url: innerChain.species.url,
        id: innerChain.species.url.split("/")[6],
      });
      if (innerChain.evolves_to.length > 0) {
        finalInnerChain = evolutionChainFormatter(innerChain, false);
      }
    }
  }
  return finalChain.concat(finalInnerChain);
};

export default evolutionChainFormatter;
