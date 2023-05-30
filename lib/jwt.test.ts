import { generateToken, decodeToken } from './jwt.ts'

describe('JWT test', () => {
    test('it has to generate the token and decode it', () => {
        const payload = { id: 1234 }
        const token = generateToken(payload)
        const out = decodeToken(token)
        delete out.iat
        delete out.exp
        expect(out).toStrictEqual(payload)
    })
})
