import mongoose from 'mongoose'

const { Schema, model } = mongoose

const daySchema = new Schema({
    date: {
        type: Date,
        require: true,
    },
    birthdays: {
        type: Array,
    },
})

export const Day = model('Day', daySchema)
