import nodemailer from 'nodemailer'
import config from '@lib/config'

export default nodemailer.createTransport({
    host: config.mailHost,
    port: config.mailPort,
    auth: {
        user: config.mailUser,
        pass: config.mailPass
    }
})
