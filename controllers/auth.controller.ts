import { User } from 'models/User'

export const login = (req, res) => {
    // try {
    //     const user = User.findOne(req.body.email)
    //     if (user) {
    //         throw({error:1100})
    //     }
    // } catch (error) {
    // }
}

export const signup = (req, res) => {
    res.json({ ok: 'signup' })
}
