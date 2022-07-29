import fs from 'fs'
import path from 'path'
import fastify from 'fastify'
import fastifyHelmet from '@fastify/helmet'
import fastifySwagger from '@fastify/swagger'
import packageJson from '../../../package.json'
import { CONFIG } from '../config'
import { makeError } from '../utils/createController'

export const fastifyApp = fastify({
    ignoreTrailingSlash: true,
    ignoreDuplicateSlashes: true,
})

export async function init() {
    // Custom error handling
    fastifyApp.setErrorHandler((err, req, res) => {
        console.error(err)
        const statusCode = err.statusCode || 500
        res.status(statusCode)
        res.send(makeError(CONFIG.isDev || statusCode < 500 ? err.message : ''))
    })

    // Security
    await fastifyApp.register(
        fastifyHelmet,
        {
            crossOriginResourcePolicy: false,
        }
    )

    // Auto docs
    if (CONFIG.isDev) {
        await fastifyApp.register(
            fastifySwagger,
            {
                exposeRoute: true,
                openapi: {
                    info: {
                        title: packageJson.name,
                        version: packageJson.version,
                    },
                },
            }
        )
    }

    // Auto load controllers
    fs.readdirSync('dist/controllers').forEach(async (fileName) => {
        if (fileName.endsWith('.js')) {
            console.log(`Registering controller '${fileName.substring(0, fileName.length - 3)}'`)
            import(path.resolve(`dist/controllers/${fileName}`))
        }
    })
}