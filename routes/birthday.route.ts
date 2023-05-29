import { Router } from 'express'
import { body } from 'express-validator'
import {
    newBirthday,
    deleteBirthday,
    sendBirthdayReminders,
} from '../controllers/birthday.controller.ts'
import { validationResultExpress } from '../middlewares/validationResultExpress.ts'
import { tokenAuthentication } from '../middlewares/tokenAuthentication.ts'

const router = Router()

router.post(
    '/new',
    body('fullName').trim(),
    body('date').trim(),
    validationResultExpress,
    tokenAuthentication,
    newBirthday
)

router.delete('/delete', tokenAuthentication, deleteBirthday)

router.get('/send', sendBirthdayReminders)

export default router
