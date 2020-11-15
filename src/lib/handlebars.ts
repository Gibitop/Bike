import Handlebars from 'handlebars'
import { readFileSync } from 'fs'

export function render(view: string,
    data: object,
    encoding: 'ascii' | 'base64' | 'binary' | 'hex' | 'latin1' | 'utf-8' | 'utf16le' | 'utf8' = 'utf8'
): string {
    const source = readFileSync(`${__dirname}/../${view}`, encoding)
    return  Handlebars.compile(source)(data)
}

