import { TSchema, Static } from "@sinclair/typebox"
import { FastifySchema } from "fastify"

type TStaticCast<T, K extends keyof T> = T[K] extends TSchema ? Static<T[K]> : never

export interface IRequestSchema<T extends FastifySchema> {
    Body: TStaticCast<T, 'body'>
    Querystring: TStaticCast<T, 'querystring'>
    Params: TStaticCast<T, 'params'>
    Headers: TStaticCast<T, 'headers'>
    Reply: T['response'] extends { [C in keyof T['response']]: TSchema } 
        ? Static<{ [C in keyof T['response']]: T['response'][C] }[keyof T['response']]> 
        : never
}


