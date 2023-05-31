import app from '../../app.ts'
import userRouter from '../../routes/user.route.ts'

app.use('/api/user/', userRouter)

export default app
