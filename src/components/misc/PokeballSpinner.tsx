import React from 'react'
import Pokeball from '@/public/img/pokeball.svg'

interface PokeballSpinnerProps {
  variant?: string
}

interface classIface {
  [key: string]: string

}

const PokeballSpinner: React.FC<PokeballSpinnerProps> = ({ variant = 'main' }) => {
  const classes: classIface = {
    main: 'w-40 h-40 flex items-center justify-center',
    pokemon: 'w-full h-full flex items-center justify-center',
    card: 'w-full h-full flex items-center justify-center',
  }

  return (
    <div className={classes[variant]}>
      <Pokeball className='w-4/5 h-4/5 animate-spin' />
    </div>
  )
}

export default PokeballSpinner