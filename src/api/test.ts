import Express from 'express'

module.exports = (app: Express.Express, path: string) => {
    /*
     * GET: /api/test
     * DESCRIPTION:
     *     // TODO: write description
     * RESULTS:
     *     - 200 : Ok
     *     - 500 : Internal server error
     */
    app.get(path, async (req: Express.Request, res: Express.Response) => {
        try {
            if (req.isAuthenticated()) {
                res.send(`Your email is: ${req.user?.email}`)
            } else {
                res.send('Access denied')
            }
        } catch (e) {
            res.sendStatus(500)
            console.error(e)        
        }
    })
}
