import { Request } from 'express'

export type userId = {
    userId: string
}

export interface RequestWithUserId extends Request {
    userId: userId
}
