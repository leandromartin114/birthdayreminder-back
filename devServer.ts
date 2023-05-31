import app from './app.ts'
import authRouter from './routes/auth.route.ts'
import userRouter from './routes/user.route.ts'
import birthdayRouter from './routes/birthday.route.ts'

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/birthday', birthdayRouter)
