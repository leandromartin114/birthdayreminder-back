import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

// Generate a token for the user
export function generateToken(obj) {
    try {
        const token = jwt.sign(obj, process.env.JWT_SECRET)
        return token
    } catch (error) {
        console.error('Problem with the token generation')
        return error
    }
}

// Decodes and validates the token received using the secret
export function decodeToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        console.error('Wrong token')
        return error
    }
}
