import { Request, Response } from 'express';

import db from '../database/connection';

interface Info {
    name?: string;
    surname?: string,
    email?: string,
    whatsapp?: string,
    bio?: string,
    subject?: string,
    cost?: number,
    schedule?: [{
        class_id?: number,
        week_day?: number,
        from?: string,
        to?: string,
    }],
    avatar?: string,
}

interface ScheduleItem {
    class_id?: number,
    week_day: number,
    from: string,
    to: string;
}

export default class ProfileController {
    async show(req: Request, res: Response) {
        const { subject } = req.body;
        
        const info: Info = {};

        const user_id = req.userId;

        const user = await db('users').where('id', user_id).first();

        if (!user)
            return res.status(400).send({ error: 'Invalid user' });

        info.name = user.name;
        info.surname = user.surname;
        info.email = user.email;
        info.whatsapp = user.whatsapp;
        info.bio = user.bio;
        info.avatar = user.avatar;

        const classes = await db('classes').where('user_id', user_id).where('subject', subject).first();

        if (classes) {
            info.cost = classes.cost;

            const classSchedule = await db('class_schedule').where('class_id', '=', classes.id);

            classSchedule.map((scheduleItem: ScheduleItem) => {
                const class_id = scheduleItem.class_id;
                const week_day = scheduleItem.week_day;
                const from = scheduleItem.from;
                const to = scheduleItem.to;

                if (info.schedule) {
                    info.schedule.push({
                        class_id,
                        week_day,
                        from,
                        to,
                    })
                }else {
                    info.schedule = [{
                        class_id,
                        week_day,
                        from,
                        to,
                    }]
                } 
            });
        }

        res.send(info);
    }
}