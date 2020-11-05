import mongoose from '@lib/mongoose'
import { Schema } from 'mongoose'

export interface IUser extends mongoose.Document {
    email: string,
    password: string,
}

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
})

export default mongoose.model<IUser>('User', UserSchema)
