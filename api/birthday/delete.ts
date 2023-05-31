import app from '../../app.ts'
import birthdayRouter from '../../routes/birthday.route.ts'

app.use('/api/birthday/', birthdayRouter)

export default app
