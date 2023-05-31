import express from 'express'
import cors from 'cors'
import './database/mongo.ts'
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json({ limit: '50mb' }))
app.use(cors())
app.listen(PORT, () => {
    console.log('App listening on port ' + PORT)
})

export default app
