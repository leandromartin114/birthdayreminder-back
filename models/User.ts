import mongoose from 'mongoose'

const { Schema, model } = mongoose

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: { unique: true },
    },
    fullName: {
        type: String,
        require: true,
    },
    birthdays: {
        type: Array,
    },
})

export const User = model('User', userSchema)
