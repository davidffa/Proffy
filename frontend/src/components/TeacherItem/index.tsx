import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import ScheduleItem from '../ScheduleItem';

import api from '../../services/api';

import './styles.css';

export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
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
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p>{teacher.bio}</p>

            <div className="schedule-items-container">
                <ScheduleItem
                    day="Segunda"
                    from=""
                    to=""
                />
                
                <ScheduleItem
                    day="Terça"
                    from=""
                    to=""
                />

                <ScheduleItem
                    day="Quarta"
                    from=""
                    to=""
                />

                <ScheduleItem
                    day="Quinta"
                    from=""
                    to=""
                />

                <ScheduleItem
                    day="Sexta"
                    from=""
                    to=""
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