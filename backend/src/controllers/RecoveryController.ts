import { Request, Response } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

import db from '../database/connection';
import mailer from '../modules/mailer';

export default class RecoveryController {
    async recover(req: Request, res: Response) {
        const { email } = req.body;

        try {
            const user = await db('users').where('email', '=', email).first();

            if (!user) 
                return res.status(400).send({ error: 'User not found' });

            const token = crypto.randomBytes(20).toString('hex');

            const now = new Date();
            now.setHours(now.getHours() + 1);

            await db('users').where('email', '=', email).update({
                passwordResetToken: token,
                passwordResetExpires: now,
            });

            mailer.sendMail({
                to: email,
                from: 'Proffy@proffy.com',
                subject: 'Recuperação de senha',
                text: `Esqueceu a sua senha? Não tem problema, utilize este token: ${token}`,
            }, (err) => {
                if (err) 
                    return res.status(400).send({ error: 'Cannot send password recovery email' });

                return res.send()
            });
        }catch (err) {
            console.log(err);
            res.status(400).send({ error: 'Error on password recovery' });
        }
    }

    async reset(req: Request, res: Response) {
        let { token, password } = req.body;

        try {
            const user = await db('users').where('passwordResetToken', '=', token).first();

            if (!user)
                return res.status(400).send({ error: 'Invalid token' });

            if (token !== user.passwordResetToken) 
                return res.status(400).send({ error: 'Invalid token' });

            const now = new Date();

            if (now > user.passwordResetExpires)
                return res.status(400).send({ error: 'Token expired, generate a new one' });

            password = await bcrypt.hash(password, 10);

            await db('users').where('passwordResetToken', '=', token).update({
                password,
                passwordResetToken: null,
                passwordResetExpires: null
            });

            res.send();
        }catch (err) {
            res.status(400).send({ error: 'Cannot reset password, try again' });
        }
    }
}