import gen from 'random-seed'
import { addMinutes } from 'date-fns'
import { sendCodeByEmail } from '../lib/sendgrid.ts'
import Auth from '../models/Auth.ts'
import User from '../models/User.ts'

const random = gen.create()

// Finds a user and sends the numeric code
export const login = async (req, res) => {
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
            code: code,
        })
    } catch (error) {
        console.error(error)
        res.status(400).send(error)
    }
}

// If the user does not exist, creates one with the corresponding auth and sends the numeric code
export const signup = async (req, res) => {
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
        res.status(200).send({
            message: 'the code was sent to ' + email,
            code: code,
        })
    } catch (error) {
        console.error(error)
        res.status(400).send(error)
    }
}

export const token = (req, res) => {
    res.json({ ok: 'token' })
}

// Generates the token for user authentication
// export async function sendToken(email: string, code: number) {
// 	const auth = await Auth.findByEmailAndCode(email, code)
// 	if (!auth) {
// 		return null
// 	}
// 	const expired = auth.isCodeExpired()
// 	if (expired) {
// 		console.error('Expired code')
// 		return expired
// 	} else {
// 		const token = generateToken({ userId: auth.data.userId })
// 		const now = new Date()
// 		auth.data.expires = now
// 		auth.push()
// 		return token
// 	}
// }
