import React from 'react'
import pokeball from '@/public/img/pokeball.svg'

interface PokeballSpinnerProps {
  variant?: string
}

interface classIface {
  [key: string]: string

}

const PokeballSpinner: React.FC<PokeballSpinnerProps> = ({ variant = 'main' }) => {
  const classes: classIface = {
    main: 'w-full h-full max-w-16 flex items-center justify-center',
    pokemon: 'w-full h-full flex items-center justify-center'
  }

  return (
    <div className={classes[variant]}>
      <img src={pokeball.src} alt='pokeball' className='w-4/5 h-4/5 animate-spin' />
    </div>
  )
}

export default PokeballSpinner