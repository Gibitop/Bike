import { Type } from '@sinclair/typebox'
import { ErrorType, NumericalIdType, PaginationRequestType, PaginationResponseType } from './common'

const queryUserResponseType = Type.Object({
    id: Type.Integer({ minimum: 1, examples: [1] }),
    username: Type.String({ examples: ['Gibito'] }),
})

export const getUserByIdSchema = {
    summary: 'Get a user by id',
    params: Type.Object({
        id: NumericalIdType,
    }),
    response: {
        200: queryUserResponseType,
        default: ErrorType,
    }
}

export const getPaginatedUsersListSchema = {
    summary: 'Get paginated users list',
    querystring: Type.Object({
        ...PaginationRequestType,
    }),
    response: {
        200: Type.Object({
            data: Type.Array(queryUserResponseType),
            pagination: PaginationResponseType,
        }),
        default: ErrorType,
    }
}

export const createUserSchema = {
    summary: 'Create a new user',
    body: Type.Object({
        username: Type.String({ examples: ['Gibito'] }),
        password: Type.String({ minLength: 8, examples: ['myPassword'] }),
    }),
    response: {
        200: Type.Object({ id: NumericalIdType }),
        default: ErrorType,
    }
}

export const updateUserSchema = {
    summary: 'Update an existing user',
    body: Type.Object({
        id: NumericalIdType,
        username: Type.String({ examples: ['Gibito'] }),
        password: Type.String({ minLength: 8, examples: ['myPassword'] }),
    }),
    response: {
        200: Type.Object({}),
        default: ErrorType,
    }
}

export const deleteUserSchema = {
    summary: 'Delete a user by their id',
    params: Type.Object({ id: NumericalIdType }),
    response: {
        200: Type.Object({}),
        default: ErrorType,
    }
}

