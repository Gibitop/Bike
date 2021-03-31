import mongoose from 'mongoose'
// No typings for this module:
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import beautifulUnique from 'mongoose-beautiful-unique-validation'
import log from '@lib/log'
import config from '@lib/config'

mongoose.set('debug', config.dbDebug)
mongoose.set('useCreateIndex', true)
mongoose.plugin(beautifulUnique)

const user = `${config.dbUser}:${config.dbPass}`
const host = `${config.dbHost}:${config.dbPort}`
mongoose
    .connect(`mongodb://${user}@${host}/admin`, {
        dbName: config.dbName,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => log.info('Connected to MongoDB'))
    .catch(() => log.error('Could not connect to MongoDB'))

export default mongoose
