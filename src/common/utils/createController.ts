import { FastifySchema, HTTPMethods, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault, RouteHandlerMethod, RouteOptions, RouteShorthandOptions, RouteShorthandOptionsWithHandler } from "fastify"
import { fastifyApp } from "@/common/lib/fastify"
import { IRequestSchema } from "../types/IRequestSchema"

type TGetRequestSchemaFromOptions<T extends RouteShorthandOptions> =
    T['schema'] extends FastifySchema
        ? IRequestSchema<T['schema']>
        : never

type TController = {
    [key in Lowercase<HTTPMethods>]: <O extends RouteShorthandOptions>(
        path: string,
        options: O,
        handler: RouteHandlerMethod<
            RawServerDefault,
            RawRequestDefaultExpression<RawServerDefault>,
            RawReplyDefaultExpression<RawServerDefault>,
            TGetRequestSchemaFromOptions<O>
        >,
    ) =>
        void |
        Promise<void> |
        TGetRequestSchemaFromOptions<O> |
        Promise<TGetRequestSchemaFromOptions<O>>
}

export const createController = (prefix: string): TController => {
    const normalizePath = (path: string) => path.startsWith('/') ? path : `/${path}`
    prefix = normalizePath(prefix)
    const addPrefix = (path: string) => `${prefix}${normalizePath(path)}`.replace(/\/+/g, '/')

    const route = (
        method: HTTPMethods,
        path: Parameters<TController[keyof TController]>[0],
        options: Parameters<TController[keyof TController]>[1],
        handler: Parameters<TController[keyof TController]>[2],
    ) => {
        const schema = {
            ...options?.schema ?? {},
            tags: [
                `Controller '${prefix.split('/').at(-1)}'`,
                ...options?.schema?.tags ?? []
            ]
        }
        fastifyApp.route({
            ...options,
            url: addPrefix(path),
            method,
            schema,
            handler,
        })
    }

    return {
        // @ts-ignore
        get: (path, options, handler) =>  route('GET', path, options, handler),
        // @ts-ignore
        post: (path, options, handler) => route('POST', path, options, handler),
        // @ts-ignore
        put: (path, options, handler) => route('PUT', path, options, handler),
        // @ts-ignore
        patch: (path, options, handler) => route('PATCH', path, options, handler),
        // @ts-ignore
        delete: (path, options, handler) => route('DELETE', path, options, handler),
        // @ts-ignore
        head: (path, options, handler) => route('HEAD', path, options, handler),
        // @ts-ignore
        options: (path, options, handler) => route('OPTIONS', path, options, handler),
    }
}

export const makeError = (message = '') => ({ message })
