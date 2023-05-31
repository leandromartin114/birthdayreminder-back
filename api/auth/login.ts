import app from '../../app.ts'
import authRouter from '../../routes/auth.route.ts'

app.use('/api/auth/login', authRouter)

export default app
