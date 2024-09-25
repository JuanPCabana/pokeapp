import React from 'react'
import Pokeball from '@/public/img/pokeball.svg'

interface PokeballSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: string
  pokeballProps?: React.SVGProps<SVGSVGElement>
}

interface classIface {
  [key: string]: string

}

/**
 * Description
 * @param variant Tipo de spinner para indicar el tamaño y posicion del spinner en base a las clases de tailwindcss.
 * @param pokeballProps Propiedades del componente Pokeball usando las propiedades de un SVG de React.
 * @param props Propiedades del componente usando de base las propiedades de un div de React para la caja exterior del spinner.
 * @returns JSX
 */
const PokeballSpinner: React.FC<PokeballSpinnerProps> = ({ variant = 'main', pokeballProps, ...props }) => {
  const classes: classIface = {
    main: 'w-40 h-40 flex items-center justify-center',
    pokemon: 'w-full h-full flex items-center justify-center',
    card: 'w-full h-full flex items-center justify-center',
  }

  return (
    <div className={classes[variant]} {...props}>
      <Pokeball className='w-4/5 h-4/5 animate-spin' {...pokeballProps} />
    </div>
  )
}

export default PokeballSpinner