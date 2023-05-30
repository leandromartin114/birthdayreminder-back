import { Response } from 'express'
import { format } from 'date-fns'
import { RequestWithUserId } from '../interfaces/index.ts'
import { sendReminderByEmail } from '../lib/sendgrid.ts'
import User from '../models/User.ts'
import Day from '../models/Day.ts'

// Creates new birthday
export const newBirthday = async (req: RequestWithUserId, res: Response) => {
    try {
        // searching the user and saving the birthday
        const date = format(new Date(req.body.date), 'MM-dd').toString()
        const user = await User.findById(req.userId).exec()
        const email = user.email
        const birthday = {
            date,
            fullName: req.body.fullName,
        }
        user.birthdays.push(birthday)
        await user.save()
        // searching for the day and if it does not exist, creates a new one and adding the birthday
        birthday['email'] = email
        const day = await Day.findOne({ date: date }).exec()
        if (!day) {
            await Day.create({ date: date, birthdays: [birthday] })
            // response
            res.status(201).send('birthday saved')
        } else {
            day.birthdays.push(birthday)
            await day.save()
            // response
            res.status(201).send({ message: 'birthday saved' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
}

// Deletes a birthday
export const deleteBirthday = async (req: RequestWithUserId, res: Response) => {
    try {
        // searching the user and deleting the birthday
        const date = format(new Date(req.body.date), 'MM-dd').toString()
        const fullName = req.body.fullName
        const user = await User.findById(req.userId).exec()
        const userBirthdays = user.birthdays
        const newUserBirthdays = userBirthdays.filter((b) => {
            if (b.fullName !== fullName && b.date !== date) {
                return b
            }
        })
        user.birthdays = newUserBirthdays
        await user.save()
        // searching and deleting the birthday at day collection
        const day = await Day.findOne({ date: date })
        const dayBirthdays = day.birthdays
        const newDayBirthdays = dayBirthdays.filter((b) => {
            if (b.fullName !== fullName && b.date !== date) {
                return b
            }
        })
        day.birthdays = newDayBirthdays
        await day.save()
        // response
        res.status(200).send({ message: 'birthday deleted' })
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

// Sending reminders by email
export const sendBirthdayReminders = async (
    req: RequestWithUserId,
    res: Response
) => {
    try {
        const date = format(new Date(), 'MM-dd').toString()
        const day = await Day.findOne({ date: date })
        const birthdays = day.birthdays
        if (!birthdays) {
            res.status(200).send('No birthdays today')
        }
        birthdays.forEach((b) => {
            sendReminderByEmail(b.email, b.fullName)
        })
        // response
        res.status(200).send('Remaninders sended')
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}
