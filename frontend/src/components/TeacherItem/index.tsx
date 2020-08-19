import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import ScheduleItem from '../ScheduleItem';

import api from '../../services/api';

import './styles.css';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    surname: string;
    subject: string;
    whatsapp: string;
    schedule: Array<ScheduleItem>;
}

interface TeacherItemProps {
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
    function createNewConnection() {
        api.post('connections', {
            user_id: teacher.id,
        });
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={`http://localhost:3333/uploads/${teacher.avatar}`} alt={teacher.name}/>
                <div>
                    <strong>{teacher.name} {teacher.surname}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p>{teacher.bio}</p>

            <div className="schedule-items-container">
                <ScheduleItem
                    day="Segunda"
                    from={teacher.schedule.find(item => item.week_day === 1)?.from}
                    to={teacher.schedule.find(item => item.week_day === 1)?.to}
                />
                
                <ScheduleItem
                    day="Terça"
                    from={teacher.schedule.find(item => item.week_day === 2)?.from}
                    to={teacher.schedule.find(item => item.week_day === 2)?.to}
                />

                <ScheduleItem
                    day="Quarta"
                    from={teacher.schedule.find(item => item.week_day === 3)?.from}
                    to={teacher.schedule.find(item => item.week_day === 3)?.to}
                />

                <ScheduleItem
                    day="Quinta"
                    from={teacher.schedule.find(item => item.week_day === 4)?.from}
                    to={teacher.schedule.find(item => item.week_day === 4)?.to}
                />

                <ScheduleItem
                    day="Sexta"
                    from={teacher.schedule.find(item => item.week_day === 5)?.from}
                    to={teacher.schedule.find(item => item.week_day === 5)?.to}
                />
            </div>

            <footer>
                <p>
                    Preço/hora
                    <strong>€ {teacher.cost}</strong>
                </p>
                <a 
                    href={`https://wa.me/${teacher.whatsapp}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={createNewConnection}
                >
                    <img src={whatsappIcon} alt="Whatsapp"/>
                    Entrar em contacto
                </a>
            </footer>
        </article>
    );
}

export default TeacherItem;