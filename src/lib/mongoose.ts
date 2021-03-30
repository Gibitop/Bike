import mongoose from 'mongoose'
// No typings for this module:
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import beautifulUnique from 'mongoose-beautiful-unique-validation'
import log from '@lib/log'

mongoose.set('debug', process.env.DB_DEBUG ?? true)
mongoose.set('useCreateIndex', true)
mongoose.plugin(beautifulUnique)

const user = `${process.env.DB_USER}:${process.env.DB_PASS}`
const host = `${process.env.DB_HOST}:${process.env.DB_PORT}`
mongoose
    .connect(`mongodb://${user}@${host}/admin`, {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => log.info('Connected to MongoDB'))
    .catch(() => log.error('Could not connect to MongoDB'))

export default mongoose
