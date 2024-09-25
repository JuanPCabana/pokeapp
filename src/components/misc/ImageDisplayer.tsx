import Image from 'next/image'
import React from 'react'
import Pokeball from '@/public/img/pokeball.svg'

interface ImageDisplayerProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
}

/**
 * Description
 * @param src Ruta de la imagen
 * @param alt Texto alternativo
 * @param props Propiedades de la imagen usando de base las propiedades de la etiqueta Image de next.js
 * @returns JSX */
const ImageDisplayer: React.FC<ImageDisplayerProps> = ({ src, alt, ...props }) => {

  if (!src) return (
    <div className='w-full h-full flex justify-center items-center'>
      <Pokeball className='w-3/4 h-3/4' />
    </div>
  )
  else {
    return (
      <Image width={100} height={100} src={src} alt={alt} priority={true} className='w-full h-full ' {...props} />
    )
  }
}

export default ImageDisplayer