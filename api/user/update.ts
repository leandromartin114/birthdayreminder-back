import app from '../../app.ts'
import userRouter from '../../routes/user.route.ts'

app.use('/api/', userRouter)

export default app
