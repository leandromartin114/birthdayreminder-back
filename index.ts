import express from 'express'
import cors from 'cors'
import './database/mongo.js'
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import birthdayRouter from './routes/birthday.route.js'
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json({ limit: '50mb' }))
app.use(cors())
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/birthday', birthdayRouter)
app.listen(PORT, () => {
    console.log('App listening on port ' + PORT)
})

export default app
