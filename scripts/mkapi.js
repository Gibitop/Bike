#! node
// Generate new endpoint

// This is not typescript
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

if (process.argv.length < 4) {
    console.error('Usage: mkapi [method] [path]')
    process.exit(-1)
}

const method = process.argv[2].toLowerCase()
const path = `/api/${process.argv[3]}`
const dirPath = path.split('/').slice(0, -1).join('/')
const ext = '.ts'

const fullDirPath = `${__dirname}/../src/${dirPath}`
const fullFilePath = `${__dirname}/../src/${path}${ext}`


const header = `import Express from 'express'

module.exports = (app: Express.Express, path: string) => {`

const endpoint = `
    /*
     * ${method.toUpperCase()}: ${path}
     * DESCRIPTION:
     *     // TODO: write description
     * RESULTS:
     *     - 200 : Ok
     *     - 500 : Internal server error
     */
    app.${method.toLowerCase()}(path, async (req: Express.Request, res: Express.Response) => {
        try {
            // TODO: implement
        } catch (e) {
            res.sendStatus(500)
            console.error(e)        
        }
    })
`

const footer = '}\n'

fs.mkdirSync(fullDirPath, { recursive: true })
if (fs.existsSync(fullFilePath)) {
    let content = fs.readFileSync(fullFilePath).toString()
    content = content.split(footer).slice(0, -1).join(footer) + endpoint + footer
    fs.writeFileSync(fullFilePath, content)
} else {
    fs.writeFileSync(fullFilePath, `${header}${endpoint}${footer}`)
}
