import Express from 'express'
import log from '@lib/log'
import File from '@/models/File'
import { v4 as uuid4 } from 'uuid'

module.exports = (app: Express.Express, path: string) => {
    /*
     * POST: /api/file/upload
     * DESCRIPTION:
     *     Saves a file to the disk.
     *     Returns a resulting file info object
     * BODY:
     *     - file <file> : file to save
     * RESULTS:
     *     - 200 : Ok
     *     - 400 : File was not provided
     *     - 400 : There should be only one file
     *     - 500 : Internal server error
     */
    app.post(path, async (req: Express.Request, res: Express.Response) => {
        try {
            if (!req.files || !req.files.file) {
                res.status(400).send('File was not provided')
                return
            }
            if (Array.isArray(req.files.file)) {
                res.status(400).send('There should be only one file')
                return
            }
            const filename = req.files.file.name
            const splittedFilename = filename.split('.')
            const extension = splittedFilename.length > 1
                ? `.${splittedFilename[splittedFilename.length - 1]}`
                : ''
            const path = `${process.env.UPLOADS_PATH ?? './uploads'}/${uuid4()}${extension}`
            req.files.file.mv(path)
            const fileObject = await File.create({
                name: filename,
                mime: req.files.file.mimetype,
                size: req.files.file.size,
                path: path,
                hash: req.files.file.md5
            })
            res.send(fileObject.toObject())
        } catch (e) {
            res.sendStatus(500)
            log.error(e)
        }
    })
}
