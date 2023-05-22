import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

const uri = process.env.MONGO_URI

try {
    mongoose.connect(uri)
    console.log('Connected to MongoDB')
} catch (error) {
    console.error('Connection failed: ' + error)
}
