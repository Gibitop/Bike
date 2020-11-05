#! node
// Generate new model

// This is not typescript
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')


if (process.argv.length < 3) {
    console.error('Usage: mkapi [model name]')
    process.exit(-1)
}

// Convert name to PascalCase
const modelName = process.argv[2].replace(/(\w)(\w*)/g,
    (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase())

fs.writeFileSync(`${__dirname}/../src/models/${modelName}.ts`,
    `import mongoose from '@lib/mongoose'
import { Schema } from 'mongoose'

interface I${modelName} extends mongoose.Document {
    // TODO: define typescript interface
}

const ${modelName}Schema = new Schema({
    // TODO: define mongoose schema
})

export default mongoose.model<I${modelName}>('${modelName}', ${modelName}Schema)
`)
