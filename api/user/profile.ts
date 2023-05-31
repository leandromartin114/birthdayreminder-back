import app from '../../app.ts'
import userRouter from '../../routes/user.route.ts'

app.use('/api/user/profile', userRouter)

export default app
