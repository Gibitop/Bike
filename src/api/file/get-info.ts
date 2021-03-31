import Express from 'express'
import log from '@lib/log'
import File from '@models/File'

module.exports = (app: Express.Express, path: string) => {
    /*
   * GET: /api/file/get-info
   * DESCRIPTION:
   *     Returns information about the requested file
   * QUERY PARAMETERS:
   *     - file <string> : ObjectId of the file to send
   * RESULTS:
   *     - 200 : Ok
   *     - 400 : Paramter `file` is not provided
   *     - 404 : Unknown file
   *     - 500 : Internal server error
   */
    app.get(path, async (req: Express.Request, res: Express.Response) => {
        try {
            if (!req.query.file) {
                res.status(400).send('Paramter `file` is not provided')
                return
            }
            const file = await File.findById(req.query.file).lean()
            if (!file) {
                res.status(404).send('Unknown file')
                return
            }
            res.send(file)
        } catch (e) {
            res.sendStatus(500)
            log.error(e)
        }
    })
}
