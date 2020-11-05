#! node
// Copies views files from src to dist

// This is not typescript
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const VIEWS_DIR = 'views'
const FROM_DIR = './src'
const TO_DIR = './dist'

if (!fs.existsSync(TO_DIR)) {
    fs.mkdirSync(TO_DIR)
} else if (fs.existsSync(`${TO_DIR}/${VIEWS_DIR}`)) {
    console.log('Target path already exists')
    process.exit(0)
}

fs.symlinkSync(
    path.resolve(`${FROM_DIR}/${VIEWS_DIR}`),
    path.resolve(`${TO_DIR}/${VIEWS_DIR}`),
    'junction'
)
