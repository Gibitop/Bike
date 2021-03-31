import mongoose from '@lib/mongoose'
import { Schema } from 'mongoose'

interface IFile extends mongoose.Document {
    name: string
    path: string
    size: number
    mime: string
    hash: string
}

const FileSchema = new Schema({
    name: String,
    path: String,
    size: Number,
    mime: String,
    hash: String,
}, { timestamps: true })

export default mongoose.model<IFile>('File', FileSchema)
