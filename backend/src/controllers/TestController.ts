import { Request, Response } from 'express';

export default class AuthController {
    async index(req: Request, res: Response) {
        res.send({ ok: true });
    }
}