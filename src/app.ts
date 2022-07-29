import { fastifyApp, init } from "./common/lib/fastify"
import { CONFIG } from "./common/config"

const main = async () => {
    console.log(process.env.NODE_ENV, CONFIG.isDev)
    await init()
    fastifyApp.listen({ host: CONFIG.httpHost, port: CONFIG.httpPort })
}

main()
