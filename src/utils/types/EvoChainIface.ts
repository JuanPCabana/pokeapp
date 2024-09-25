import { Species } from "./auxiliars";
import { EvolutionDetails } from "./EvolutionDetails";

interface EvoChainIface {
  evolution_details: EvolutionDetails[];
  evolves_to: EvoChainIface[];
  is_baby: boolean;
  species: Species;
}

export type { EvoChainIface };
