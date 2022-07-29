import dotenv from 'dotenv'

dotenv.config()

const requiredCrash = (variableName: string) => {
    console.error(`Config variable '${variableName}' is required, but not provided. Crushing...`)
    process.exit(-1)
}

export const CONFIG = {
    isDev: process.env.NODE_ENV === 'development',
    httpHost: process.env.HTTP_HOST || 'localhost',
    httpPort: Number(process.env.HTTP_PORT) || 3001 ,
    passwordSalt: process.env.PASSWORD_SALT || requiredCrash('PASSWORD_SALT')
}
