import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/img/headerLogo.png'

/**
 * Componente de cabecera
 * @returns JSX
 */
const Header = () => {
  return (
    <header className='bg-primary h-20 flex justify-between'>
      <div className=' flex items-center ml-10 max-w-[30%]'>
        <Link href='/'>
          <Image src={logo.src} alt='logo' width={100} height={100} className='w-40 h-20' />
        </Link>
      </div>
      <div className=' flex justify-end items-center mr-10'>
        <Link href='https://github.com/JuanPCabana/pokeapp'>
          <Button variant='secondary'>Repo</Button>
        </Link>
      </div>

    </header>
  )
}

export default Header