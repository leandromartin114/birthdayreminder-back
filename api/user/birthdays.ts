import app from '../../app.ts'
import userRouter from '../../routes/user.route.ts'

app.use('/api/user/birthdays', userRouter)

export default app
