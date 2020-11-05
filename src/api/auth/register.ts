import Express from 'express'
import User from '@models/User'
import { hash } from 'bcrypt'
import { validate as validateEmail } from 'email-validator'
import passwordValidator from '@lib/passwordValidator'

module.exports = (app: Express.Express, path: string) => {
    /*
     * POST: /api/auth/register
     * DESCRIPTION:
     *     Registeres a new user
     * BODY:
     *     - email       <string> : User's email (will be used to log in)
     *     - password    <string> : User's password (will be used to log in)
     * RESULTS:
     *     - 200 : User registered successfully
     *     - 400 : Email or password is invalid
     *     - 400 : User with this email aleready exists
     *     - 500 : Internal server error
     */
    app.post(path, async (req: Express.Request, res: Express.Response) => {
        try {
            const email: string = req.body.email?.toLowerCase()
            const password: string = req.body.password

            if (!email || !validateEmail(email) ||
                !password || !passwordValidator.validate(password)) {
                res.status(400).send('Email or password is invalid')
                return
            }

            if (await User.exists({ email })) {
                res.status(400).send('User with this email aleready exists')
                return
            }

            const user = await User.create({
                email,
                password: await hash(password, 12),
            })

            if (!user) {
                res.sendStatus(500)
                return
            }

            req.login(user, async err => {
                if (err) {
                    console.error(err)
                    await user.deleteOne()
                    res.sendStatus(500)
                } else {
                    res.sendStatus(200)
                }
            })
        } catch (e) {
            res.sendStatus(500)
            console.error(e)
        }
    })
}
