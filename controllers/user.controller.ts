import User from '../models/User.ts'

// Gets the profile data
export const profile = async (req, res) => {
    try {
        // searching for the user
        const user = await User.findById(req.userId).exec()
        if (!user) {
            throw { error: 'The user does not exist or invalid token' }
        }
        // response
        res.status(200).send(user)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

// Updates the profile data
export const update = async (req, res) => {
    try {
        console.log('update')
    } catch (error) {
        console.error(error)
        res.status(400).send(error)
    }
}

// Checks the email and if the code is not expired returns the token
export const birthdays = async (req, res) => {
    try {
        console.log('birthdays')
    } catch (error) {
        console.error(error)
        res.status(401).send(error)
    }
}
