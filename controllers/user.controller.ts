import { Response } from 'express'
import { RequestWithUserId } from '../interfaces/index.ts'
import Auth from '../models/Auth.ts'
import User from '../models/User.ts'

// Gets the profile data
export const profile = async (req: RequestWithUserId, res: Response) => {
    try {
        // searching for the user
        const user = await User.findById(req.userId).exec()
        if (!user) {
            throw { error: 'The user does not exist or invalid token' }
        }
        // response
        res.status(200).send(user)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

// Updates the profile data
export const update = async (req: RequestWithUserId, res: Response) => {
    try {
        // searching for the user and auth
        const email = req.body.email
        const fullName = req.body.fullName
        const user = await User.findById(req.userId).exec()
        if (!user) {
            throw { error: 'The user does not exist or invalid token' }
        }
        const auth = await Auth.findOne({ userId: req.userId }).exec()
        // updating user and auth data
        user.email = email
        user.fullName = fullName
        auth.email = email
        await user.save()
        await auth.save()
        res.status(200).send(user)
    } catch (error) {
        console.error(error)
        res.status(400).send(error)
    }
}

// Gets the birthdays saved by the user
export const birthdays = async (req: RequestWithUserId, res: Response) => {
    try {
        // searching for the user
        const user = await User.findById(req.userId).exec()
        if (!user) {
            throw { error: 'The user does not exist or invalid token' }
        }
        const birthdays = user.birthdays
        res.status(200).send(birthdays)
    } catch (error) {
        console.error(error)
        res.status(401).send(error)
    }
}
