import { Router } from 'express'
import { body } from 'express-validator'
import { login, signup } from '../controllers/auth.controller.ts'
import { validationResultExpress } from '../middlewares/validationResultExpress.ts'

const router = Router()

router.post(
    '/login',
    body('email').trim().isEmail().normalizeEmail(),
    validationResultExpress,
    login
)
router.post('/signup', signup)

export default router
