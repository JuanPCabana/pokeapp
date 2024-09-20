import React from 'react'
import pokeball from '@/public/img/pokeball.svg'

const PokeballSpinner = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <img src={pokeball.src} alt='pokeball' className='w-4/5 h-4/5 animate-spin' />
    </div>
  )
}

export default PokeballSpinner