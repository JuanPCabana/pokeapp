import BugIconSvg from '@/public/img/types/bug.svg';
import DarkIconSvg from '@/public/img/types/dark.svg';
import DragonIconSvg from '@/public/img/types/dragon.svg';
import ElectricIconSvg from '@/public/img/types/electric.svg';
import FairyIconSvg from '@/public/img/types/fairy.svg';
import FightingIconSvg from '@/public/img/types/fighting.svg';
import FireIconSvg from '@/public/img/types/fire.svg';
import FlyingIconSvg from '@/public/img/types/flying.svg';
import GhostIconSvg from '@/public/img/types/ghost.svg';
import GrassIconSvg from '@/public/img/types/grass.svg';
import GroundIconSvg from '@/public/img/types/ground.svg';
import IceIconSvg from '@/public/img/types/ice.svg';
import NormalIconSvg from '@/public/img/types/normal.svg';
import PoisonIconSvg from '@/public/img/types/poison.svg';
import PsychicIconSvg from '@/public/img/types/psychic.svg';
import RockIconSvg from '@/public/img/types/rock.svg';
import SteelIconSvg from '@/public/img/types/steel.svg';
import WaterIconSvg from '@/public/img/types/water.svg';
import { SVGProps } from 'react';

export const typeIcons: Record<string, React.FC<SVGProps<SVGSVGElement>>> = {
  bug: BugIconSvg,
  dark: DarkIconSvg,
  dragon: DragonIconSvg,
  electric: ElectricIconSvg,
  fairy: FairyIconSvg,
  fighting: FightingIconSvg,
  fire: FireIconSvg,
  flying: FlyingIconSvg,
  ghost: GhostIconSvg,
  grass: GrassIconSvg,
  ground: GroundIconSvg,
  ice: IceIconSvg,
  normal: NormalIconSvg,
  poison: PoisonIconSvg,
  psychic: PsychicIconSvg,
  rock: RockIconSvg,
  steel: SteelIconSvg,
  water: WaterIconSvg,
};