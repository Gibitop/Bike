import Express from 'express'
import passport from '@lib/passport'
import log from '@lib/log'

module.exports = (app: Express.Express, path: string) => {
    /*
   * POST: /api/auth/login
   * DESCRIPTION:
   *     Returns session token in form of http only cookie
   * BODY:
   *     - email    <string> : user's email
   *     - password <string> : user's password
   * RESULTS:
   *     - 200 : Login successful
   *     - 400 : Required field is invalid
   *     - 401 : Login failed
   *     - 500 : Internal server error
   */
    app.post(
        path,
        passport.authenticate('local'),
        async (req: Express.Request, res: Express.Response) => {
            try {
                res.sendStatus(200)
            } catch (e) {
                res.sendStatus(500)
                log.error(e)
            }
        }
    )
}
