import app from '../../app.ts'
import birthdayRouter from '../../routes/birthday.route.ts'

app.use('/api/', birthdayRouter)

export default app
