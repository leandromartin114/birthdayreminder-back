import app from '../../app.ts'
import authRouter from '../../routes/auth.route.ts'

app.use('/api/auth/', authRouter)

export default app
