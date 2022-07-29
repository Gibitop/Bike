import { Type } from "@sinclair/typebox";

export const NumericalIdType = Type.Integer({
    minimum: 1,
    examples: [1],
})

export const ErrorType = Type.Object({
    message: Type.String(),
})

export const PaginationRequestType = Type.Object({
    page: Type.Integer({ minimum: 1, default: 1, examples: [1] }),
    perPage: Type.Integer({ minimum: 1, default: 10, examples: [10] }),
})

export const PaginationResponseType = Type.Object({
    page: Type.Integer({ minimum: 1 }),
    perPage: Type.Integer({ minimum: 1 }),
    total: Type.Integer({ minimum: 0 }),
})
