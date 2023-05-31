import app from '../../app.ts'
import birthdayRouter from '../../routes/birthday.route.ts'

app.use('/api/birthday/delete', birthdayRouter)

export default app
