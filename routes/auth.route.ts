import { Router } from 'express'
import { body } from 'express-validator'
import { login, signup, token } from '../controllers/auth.controller.ts'
import { validationResultExpress } from '../middlewares/validationResultExpress.ts'

const router = Router()

router.post(
    '/login',
    body('email').trim().isEmail().normalizeEmail(),
    validationResultExpress,
    login
)

router.post(
    '/signup',
    body('email').trim().isEmail().normalizeEmail(),
    validationResultExpress,
    signup
)

router.post(
    '/token',
    body('email').trim().isEmail().normalizeEmail(),
    body('code').trim().isNumeric(),
    validationResultExpress,
    token
)

export default router
