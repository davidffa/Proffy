import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import db from '../database/connection';

interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    avatar: string;
    whatsapp: string;
    bio: string;
}

function generateToken(user: User) {
    return jwt.sign({ id: user.id }, process.env.secret as string, {
        expiresIn: 86400,
    });
}

export default class AuthController {
    async register(req: Request, res: Response) {
        let { name, surname, email, password } = req.body;

        const user = await db('users').where('email', '=', email).first();

        if (user) {
            return res.status(400).json({
                error: 'User already exists'
            });
        }

        const trx = await db.transaction();

        try {
            password = await bcrypt.hash(password, 10);

            await trx('users').insert({
                name,
                surname,
                email,
                password,
            });

            password = '';

            await trx.commit();
            
            const user = await db('users').where('email', '=', email).first() as User;

            return res.status(201).send({
                token: generateToken(user),
            });
        }catch (err) {
            await trx.rollback();
            console.log(err);
            return res.status(400).json({
                error: 'Unexpected error while registering a new user',
            })
        }
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await db('users').where('email', '=', email).first() as User;

        if (!user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).json({
                error: 'Invalid password',
            });
        }

        user.password = '';

        res.send({ 
            token: generateToken(user),
        });
    }
}