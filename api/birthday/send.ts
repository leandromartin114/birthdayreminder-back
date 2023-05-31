import app from '../../app.ts'
import birthdayRouter from '../../routes/birthday.route.ts'

app.use('/api/birthday/send', birthdayRouter)

export default app
