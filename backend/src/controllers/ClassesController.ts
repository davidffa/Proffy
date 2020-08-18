import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
    week_day: number,
    from: string,
    to: string;
}

export default class ClassesController {
    async index(req: Request, res: Response) {
        const filters = req.query;

        if (!filters.week_day || !filters.subject || !filters.time) {
            const allClasses = await db('classes')  
                .join('users', 'classes.user_id', '=', 'users.id')
                .select(['classes.*', 'users.name', 'users.surname', 'users.whatsapp', 'users.avatar', 'users.bio']);
            return res.json(allClasses);
        }

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('classes')
            .whereExists(function () {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);
        
        return res.json(classes);
    }

    async create(req: Request, res: Response) {
        const {
            email,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = req.body;

        const user_id = req.userId;

        //console.log({ name, surname, email, whatsapp, bio, subject, cost, schedule, user_id, avatar})

        const user = await db('users').where('id', user_id).first();

        if (!user) {
            return res.status(400).send({ error: 'User not found' });
        }

        const trx = await db.transaction();

        try {
            await trx('users').where('id', user_id).update({
                email,
                whatsapp,
                bio,
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

            res.status(400).send({ error: 'Error while creating class' });
        }
    }
}