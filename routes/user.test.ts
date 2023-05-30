import request from 'supertest'
import * as dotenv from 'dotenv'
dotenv.config()

describe('User tests', () => {
    const email = 'leandromartin_17@hotmail.com'
    const mockData = {
        email: 'leandromartin_17@hotmail.com',
        fullName: 'Leandrito',
    }

    test('profile should return an object with the user data', async () => {
        const res = await request(process.env.API_URL)
            .post('/auth/login')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({ email: email })
        const code = res.body.code
        const res2 = await request(process.env.API_URL)
            .post('/auth/token')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({ email: email, code: code })
        const token = res2.body.token
        const res3 = await request(process.env.API_URL)
            .get('/user/profile')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'bearer ' + token)

        expect(res3.status).toBe(200)
        expect(res3.body.email).toStrictEqual(email)
    })

    test('update should return an object with the updated data', async () => {
        const res = await request(process.env.API_URL)
            .post('/auth/login')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({ email: email })
        const code = res.body.code
        const res2 = await request(process.env.API_URL)
            .post('/auth/token')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({ email: email, code: code })
        const token = res2.body.token
        const res3 = await request(process.env.API_URL)
            .patch('/user/update')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'bearer ' + token)
            .send(mockData)
        expect(res3.status).toBe(200)
        expect(res3.body.email).toStrictEqual(email)
    })

    test('birthdays should return an array with all the birthdays saved by the user', async () => {
        const res = await request(process.env.API_URL)
            .post('/auth/login')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({ email: email })
        const code = res.body.code
        const res2 = await request(process.env.API_URL)
            .post('/auth/token')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({ email: email, code: code })
        const token = res2.body.token
        const res3 = await request(process.env.API_URL)
            .get('/user/birthdays')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'bearer ' + token)
        expect(res3.status).toBe(200)
    })
})
