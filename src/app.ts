// Enable source maps
import 'source-map-support/register'

// Enable path aliases
import 'module-alias/register'

// Load .env
import dotenv from 'dotenv'
dotenv.config()

// Express setup
import express from 'express'
const port = parseInt(process.env.APP_PORT || '3001')
const host = process.env.APP_HOST || 'localhost'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// DB setup
import mongoose from '@lib/mongoose'

// Auth setup
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import connectMongo from 'connect-mongo'
import passport from '@lib/passport'
app.use(cookieParser())
app.use(expressSession({
    secret: process.env.AUTH_SECRET || '',
    resave: true,
    saveUninitialized: true,
    store: new (connectMongo(expressSession))({
        mongooseConnection: mongoose.connection
    }),
    cookie: {
        httpOnly: true,
        sameSite: 'strict',
        signed: true
    }
}))
app.use(passport.initialize())
app.use(passport.session())

// Recursively finds and adds endpoints
import fs from 'fs'
const registerEndpoints = (path: string, requireRelativePrefix = '') => {
    const files = fs.readdirSync(`${__dirname}/${path}`)
    for (const file of files) {
        const stat = fs.statSync(`${__dirname}/${path}/${file}`)
        if (stat.isFile()) {
            if (file.endsWith('.js') || (file.endsWith('.ts') && !file.endsWith('.d.ts'))) {
                const name = `${path}/${file.substr(0, file.length - 3)}`
                console.log('Registering endpoint: /' + name)
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                require(`${__dirname}/${requireRelativePrefix}${name}`)(app, '/' + name)
            }
        } else {
            registerEndpoints(path + '/' + file, requireRelativePrefix)
        }
    }
}

// API setup
registerEndpoints('api')

// Server side rendering setup
import expressHandlebars from 'express-handlebars'
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')
app.engine('handlebars', expressHandlebars({
    extname: 'handlebars',
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views`
}))


// Start the Express server
app.listen(port, host, () => {
    console.log(`Server is listening at http://${host}:${port}`)
})
