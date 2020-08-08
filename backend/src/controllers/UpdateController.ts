import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import convertHourToMinutes from '../utils/convertHourToMinutes';

import db from '../database/connection';

interface ScheduleItem {
    class_id?: number,
    week_day: number,
    from: string,
    to: string;
}

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

export default class UpdateController {
    async update(req: Request, res: Response) {
        const {
            name,
            surname,
            email,
            whatsapp,
            bio,
            subject,
            cost,
        } = req.body;

        let { schedule } = req.body;
        schedule = JSON.parse(schedule);

        const user_id = req.userId;
        const avatar = req.file.filename;
        let oldAvatar = undefined;

        //console.log({ name, surname, email, whatsapp, bio, subject, cost, schedule, user_id, avatar})

        const user = await db('users').where('id', user_id).first();

        if (!user) {
            if (avatar) {
                fs.unlinkSync(path.resolve(__dirname, '..', '..', 'uploads', avatar));
            }
            return res.status(400).send({ error: 'User not found' });
        }
            

        if (user.avatar && avatar) {
            oldAvatar = user.avatar;
        }

        const trx = await db.transaction();

        try {
            await trx('users').where('id', user_id).update({
                name,
                surname,
                email,
                whatsapp,
                bio,
                avatar,
            });

            const classExists = await trx('classes').where('subject', subject).first();
            let classesIds;

            if (classExists) {
                classesIds = await trx('classes').where('subject', subject).update({
                    subject,
                    cost,
                    user_id,
               });  
            }else {
                classesIds = await trx('classes').insert({
                    subject,
                    cost,
                    user_id,
               });
               classesIds = classesIds[0];
            }

            const class_id = classesIds;

            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                };
            });

            await trx('class_schedule').where('class_id', '=', class_id).delete();
            await trx('class_schedule').insert(classSchedule);
         
            await trx.commit();

            res.send();
        }catch (err) {
            await trx.rollback();

            if (avatar) {
                fs.unlinkSync(path.resolve(__dirname, '..', '..', 'uploads', avatar));
            }
            
            res.status(400).send({ error: 'Error while updating data' });
        }

        try {
            if (oldAvatar) {
                fs.unlinkSync(path.resolve(__dirname, '..', '..', 'uploads', oldAvatar));
            }
        }catch(err) {}
    }

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