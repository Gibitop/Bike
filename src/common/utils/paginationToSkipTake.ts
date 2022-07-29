import { PaginationRequestType } from '@/schemas/common'
import { Static } from '@sinclair/typebox'

export const paginationToSkipTake = ({ page, perPage }: Static<typeof PaginationRequestType>) => ({
    skip: (page - 1) * perPage,
    take: perPage,
})
