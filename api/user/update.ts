import app from '../../app.ts'
import userRouter from '../../routes/user.route.ts'

app.use('/api/user/update', userRouter)

export default app
