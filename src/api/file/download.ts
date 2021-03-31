import Express from 'express'
import log from '@lib/log'
import File from '@models/File'
import fs from 'fs'

module.exports = (app: Express.Express, path: string) => {
    /*
     * GET: /api/file/download
     * DESCRIPTION:
     *     Sends the requested file
     * QUERY PARAMETERS:
     *     - file <string> : ObjectId of the file to send
     * RESULTS:
     *     - 200 : Ok
     *     - 400 : Paramter `file` is not provided
     *     - 404 : Unknown file
     *     - 404 : File not found
     *     - 500 : Internal server error
     */
    app.get(path, async (req: Express.Request, res: Express.Response) => {
        try {
            if (!req.query.file) {
                res.status(400).send('Paramter `file` is not provided')
                return
            }
            const file = await File.findById(req.query.file)
            if (!file) {
                res.status(404).send('Unknown file')
                return
            }
            if (!fs.existsSync(file.path)) {
                res.status(404).send('File not found')
                return
            }
            res.download(file.path, file.name)
        } catch (e) {
            res.sendStatus(500)
            log.error(e)
        }
    })
}
