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

const Paginator = () => {
  const dispatch = useAppDispatch()
  const actualPage = useAppSelector((state) => state.pokemonReducer.page)
  const maxPage = useAppSelector((state) => state.pokemonReducer.maxPage)
  return (
    <Pagination>

      <PaginationContent>
        <PaginationItem >
          <PaginationPrevious onClick={() => dispatch(setPreviousPokemonPage())} />
        </PaginationItem>

        {actualPage > 1 && (
          <>
            {actualPage > 4 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {new Array(actualPage - 1).fill(null).map((_, index: number) => (
              <>
                {index + 5 > actualPage &&
                  <PaginationItem key={index}>
                    <PaginationLink onClick={() => dispatch(setPage(index + 1))} >{index + 1}</PaginationLink>
                  </PaginationItem>
                }
              </>
            ))}
          </>
        )}

        <PaginationItem>
          <PaginationLink className='bg-secondary text-black'>{actualPage}</PaginationLink>
        </PaginationItem>

        {actualPage < maxPage && (
          <>
            {new Array(actualPage + 3).fill(null).map((_, index: number) => (
              <>
                {(index + 1) > actualPage &&
                  <PaginationItem key={index}>
                    <PaginationLink onClick={() => dispatch(setPage(index + 1))} >{index + 1}</PaginationLink>
                  </PaginationItem>
                }
              </>
            ))}

            {actualPage + 3 < maxPage && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        <PaginationItem>
          <PaginationNext onClick={() => dispatch(setNextPokemonPage())} />
        </PaginationItem>
      </PaginationContent>

    </Pagination>

  )
}

export default Paginator