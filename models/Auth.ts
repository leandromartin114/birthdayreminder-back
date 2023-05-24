import mongoose from 'mongoose'

const { Schema, model } = mongoose

const authSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: { unique: true },
    },
    code: {
        type: Number,
        require: true,
    },
    expires: {
        type: Date,
        require: true,
    },
    userId: {
        type: String,
        require: true,
    },
})

export const Auth = model('Auth', authSchema)
