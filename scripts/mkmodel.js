#! node
// Generate new model

// This is not typescript
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')


if (process.argv.length < 3) {
    console.error('Usage: mkmodel [model name]')
    process.exit(-1)
}

// Convert name to PascalCase
const modelName = process.argv[2]
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase())
    .replace(/([^\w]|_)/g, '')
    .replace(/(^.)(.*$)/, (_, g0, g1) => `${g0.toUpperCase()}${g1}`)

fs.writeFileSync(`${__dirname}/../src/models/${modelName}.ts`,
    `import mongoose from '@lib/mongoose'
import { Schema } from 'mongoose'

interface I${modelName} extends mongoose.Document {
    // TODO: define typescript interface
}

const ${modelName}Schema = new Schema({
    // TODO: define mongoose schema
}, { timestamps: true })

export default mongoose.model<I${modelName}>('${modelName}', ${modelName}Schema)
`)
