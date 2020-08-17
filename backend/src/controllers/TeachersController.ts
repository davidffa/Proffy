import { Request, Response } from 'express';
import db from '../database/connection';

export default class TeachersController {
    async index(req: Request, res: Response) {
        const teachers = await db('classes').countDistinct('user_id').first();

        return res.json({ total: parseInt(JSON.stringify(teachers).split(':')[1].split('')[0]) });
    }
}
