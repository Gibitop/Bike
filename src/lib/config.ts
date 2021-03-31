import log from '@lib/log'

type TConfigDatatype = string | number | boolean
type TConfigDatatypeStr = 'string' | 'number' | 'boolean'
interface IUseParameters {
    type?: TConfigDatatypeStr
    required?: boolean
    default?: TConfigDatatype
    name?: string
}


const use = (
    value?: TConfigDatatype,
    parameters?: IUseParameters
) => {
    if (value === undefined) {
        if (parameters?.default) {
            value = parameters.default
        } else {
            if (parameters?.required) {
                log.fatal('Required config parameter ' +
                    (parameters.name ? `'${parameters.name}' ` : '') +
                    'is undefined')
                process.exit(-1)
            }
            return value
        }
    }
    if (parameters?.type) {
        switch (parameters.type) {
            case 'string': return value.toString()
            case 'number': return Number(value)
            case 'boolean': return value.toString() === 'true'
        }
    }
    return value
}

const useFromEnv = (name: string, parameters?: IUseParameters) =>
    use(process.env[name], { name, ...parameters })

export default {
    appHost: useFromEnv('APP_HOST', { default: 'localhost' }) as string,
    appPort: useFromEnv('APP_PORT', { type: 'number', default: 3001 }) as number,

    authSecret: use('AUTH_SECRET', { required: true }) as string,

    dbHost: useFromEnv('DB_HOST', { required: true }) as string,
    dbPort: useFromEnv('DB_PORT', { type: 'number', default: 27017 }) as number,
    dbUser: useFromEnv('DB_USER', { required: true }) as string,
    dbPass: useFromEnv('DB_PASS', { required: true }) as string,
    dbName: useFromEnv('DB_NAME', { required: true }) as string,
    dbDebug: useFromEnv('DB_DEBUG', { type: 'boolean', default: true }) as boolean,

    mailHost: useFromEnv('MAIL_HOST') as string,
    mailPort: useFromEnv('MAIL_PORT', { type: 'number', default: 587 }) as number,
    mailUser: useFromEnv('MAIL_USER') as string,
    mailPass: useFromEnv('MAIL_PASS') as string,

    uploadsPath: useFromEnv('UPLOADS_PATH', { default: './uploads' }) as string,

    logLevel: useFromEnv('LOG_LEVEL', { default: 'all' }) as string
}
