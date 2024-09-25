import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setNextPokemonPage, setPreviousPokemonPage, setPage } from '@/redux/features/pokemonSlice'



/**
 * Componente que se encarga de mostrar la paginación de la lista de pokemones en base a la página actual y la cantidad de páginas. (Usa el store de redux)
 * @returns {any}
 */
const Paginator = () => {
  const dispatch = useAppDispatch()
  const actualPage = useAppSelector((state) => state.pokemonReducer.page)
  const maxPage = useAppSelector((state) => state.pokemonReducer.maxPage)
  return (
    <Pagination>

      <PaginationContent>
        {/* Previous pages logic */}
        {actualPage > 1 && (
          <>
            <PaginationItem >
              <PaginationPrevious onClick={() => dispatch(setPreviousPokemonPage())} />
            </PaginationItem>

            <PaginationItem >
              <PaginationLink onClick={() => dispatch(setPage(1))} >{1}</PaginationLink>
            </PaginationItem>

            {actualPage > 4 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {new Array(actualPage - 1).fill(null).map((_, index: number) => (
              <>
                {index + 4 > actualPage && index + 1 > 1 &&
                  <PaginationItem key={index}>
                    <PaginationLink onClick={() => dispatch(setPage(index + 1))} >{index + 1}</PaginationLink>
                  </PaginationItem>
                }
              </>
            ))}
          </>
        )}

        {/* Current Page */}
        <PaginationItem>
          <PaginationLink className='bg-secondary text-black'>{actualPage}</PaginationLink>
        </PaginationItem>

        {/* Next pages logic */}
        {actualPage < maxPage && (
          <>
            {new Array(actualPage + 2).fill(null).map((_, index: number) => (
              (index + 1) > actualPage && (index + 1) < maxPage &&
              <PaginationItem key={index}>
                <PaginationLink onClick={() => dispatch(setPage(index + 1))} >{index + 1}</PaginationLink>
              </PaginationItem>

            ))}

            {actualPage + 3 < maxPage && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {/* Last page logic */}
        {actualPage < maxPage &&
          <>
            <PaginationItem >
              <PaginationLink onClick={() => dispatch(setPage(maxPage))} >{maxPage}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={() => dispatch(setNextPokemonPage())} />
            </PaginationItem>
          </>
        }
      </PaginationContent>

    </Pagination>

  )
}

export default Paginator