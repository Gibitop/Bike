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

// Should not copy, if the target is linked
if (fs.existsSync(`${TO_DIR}/${VIEWS_DIR}`)) {
    const stats = fs.lstatSync(`${TO_DIR}/${VIEWS_DIR}`)
    if (stats.isSymbolicLink()) {
        process.exit(0)
    }
}


function copyFileSync(source, target) {
    var targetFile = target
    // If target is a directory, a new file with the same name will be created
    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source))
        }
    }
    fs.writeFileSync(targetFile, fs.readFileSync(source))
}

function copyFolderRecursiveSync(source, target) {
    var files = []
    // Check if folder needs to be created or integrated
    var targetFolder = path.join(target, path.basename(source))
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder)
    }

    // Copy
    if (fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source)
        files.forEach(function (file) {
            var curSource = path.join(source, file)
            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, targetFolder)
            } else {
                copyFileSync(curSource, targetFolder)
            }
        })
    }
}

copyFolderRecursiveSync(`${FROM_DIR}/${VIEWS_DIR}`, TO_DIR)

