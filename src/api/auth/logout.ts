import Express from 'express'
import log from '@lib/log'


module.exports = (app: Express.Express, path: string) => {
    /*
   * ANY HTTP METHOD: /api/auth/logout
   * DESCRIPTION:
   *     Terminate current session
   * RESULTS:
   *     - 200 : Logged out successfully
   *     - 500 : Internal server error
   */
    app.use(path, async (req: Express.Request, res: Express.Response) => {
        try {
            req.logout()
            res.sendStatus(200)
        } catch (e) {
            res.sendStatus(500)
            log.error(e)
        }
    })
}
