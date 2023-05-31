import app from '../../app.ts'
import authRouter from '../../routes/auth.route.ts'

app.use('/api/auth/signup', authRouter)

export default app
