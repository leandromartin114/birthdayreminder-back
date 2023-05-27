import { Response, Request } from 'express'
import gen from 'random-seed'
import { addMinutes, isAfter } from 'date-fns'
import { sendCodeByEmail } from '../lib/sendgrid.ts'
import { generateToken } from '../lib/jwt.ts'
import Auth from '../models/Auth.ts'
import User from '../models/User.ts'

const random = gen.create()

// Finds a user and sends the numeric code
export const login = async (req: Request, res: Response) => {
    try {
        // searching for an existing user
        const email = req.body.email
        const auth = await Auth.findOne({ email: email }).exec()
        if (!auth) {
            throw { error: 'The user does not exist' }
        }
        // sending the code
        const code = random.intBetween(10000, 99999)
        const now = new Date()
        const tenMinutesExpDate = addMinutes(now, 10)
        auth.code = code
        auth.expires = tenMinutesExpDate
        await auth.save()
        await sendCodeByEmail(email, code)
        // response
        res.status(200).send({
            message: 'the code was sent to ' + email,
            code,
        })
    } catch (error) {
        console.error(error)
        res.status(400).send(error)
    }
}

// If the user does not exist, creates one with the corresponding auth and sends the numeric code
export const signup = async (req: Request, res: Response) => {
    try {
        // searching for an existing user
        const email = req.body.email
        const auth = await Auth.findOne({ email: email }).exec()
        if (auth) {
            throw { error: 'The user already exists' }
        }
        // creating the user
        const newUser = await User.create({
            email: email,
            fullName: req.body.fullName,
            birthdays: [],
        })
        const userId = newUser._id
        const code = random.intBetween(10000, 99999)
        const now = new Date()
        const tenMinutesExpDate = addMinutes(now, 10)
        // creating the auth
        await Auth.create({
            email: email,
            code: code,
            expires: tenMinutesExpDate,
            userId: userId,
        })
        // sending the code
        await sendCodeByEmail(email, code)
        // response
        res.status(201).send({
            message: 'the code was sent to ' + email,
            code,
        })
    } catch (error) {
        console.error(error)
        res.status(400).send(error)
    }
}

// Checks the email and if the code is not expired returns the token
export const token = async (req: Request, res: Response) => {
    try {
        // searching for the user with a valid code
        const email = req.body.email
        const code = req.body.code
        const auth = await Auth.find({ email: email, code: code }).exec()
        if (auth.length === 0) {
            throw { error: 'Invalid email or code' }
        }
        // checking if the code is expired
        const expires = auth[0].expires
        const now = new Date()
        const expired = isAfter(now, expires)
        if (expired) {
            throw { error: 'Expired code' }
        }
        // generating token for authentication
        const token = generateToken({ userId: auth[0].userId })
        auth[0].expires = now
        await auth[0].save()
        res.status(200).send({ token })
    } catch (error) {
        console.error(error)
        res.status(401).send(error)
    }
}
