import { Router } from 'express'
import { body } from 'express-validator'
import { profile, update, birthdays } from '../controllers/user.controller.ts'
import { validationResultExpress } from '../middlewares/validationResultExpress.ts'
import { tokenAuthentication } from '../middlewares/tokenAuthentication.ts'

const router = Router()

router.get('/profile', tokenAuthentication, profile)

router.patch(
    '/update',
    body('email').trim().isEmail().normalizeEmail(),
    body('fullName').trim(),
    validationResultExpress,
    tokenAuthentication,
    update
)

router.get('/birthdays', tokenAuthentication, birthdays)

export default router
