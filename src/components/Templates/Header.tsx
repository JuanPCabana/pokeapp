import React from 'react'
import { Button } from '@/components/ui/button'

const Header = () => {
  return (
    <header className='bg-primary h-20 flex'>
      <div className='w-1/2 flex items-center ml-10'>
        <h1 className=''>HomePage</h1>
      </div>
      <div className='w-1/2 flex justify-end items-center mr-10'>
        <Button variant='secondary'>Click</Button>
      </div>

    </header>
  )
}

export default Header