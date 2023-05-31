import app from '../../app.ts'
import authRouter from '../../routes/auth.route.ts'

app.use('/api/', authRouter)

export default app
