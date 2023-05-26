import { decodeToken } from '../lib/jwt.ts'

export const tokenAuthentication = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            res.status(401).send({ message: 'No token' })
        }
        const decodedToken = decodeToken(token)
        req.userId = decodedToken.userId
        next()
    } catch (error) {
        console.error(error.message)
        res.status(401).send({ error: error.message })
    }
}
