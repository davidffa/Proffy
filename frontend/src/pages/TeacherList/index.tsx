import React, { useState, FormEvent, useEffect } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import teacherEmoji from '../../assets/images/icons/teacher-emoji.svg';

import api from '../../services/api';

import './styles.css';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    const [totalTeachers, setTotalTeachers] = useState(0);

    useEffect(() => {
        api.get('classes')
            .then(res => setTeachers(res.data));

        api.get('teachers').then(res => setTotalTeachers(res.data.total));
    }, []);

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        const res = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });

        setTeachers(res.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis." headerTitle="Estudar">
                <div className="total-teachers-container">
                    <img src={teacherEmoji} alt="Proffys" />
                    <span id="total-teachers">Nós temos {totalTeachers} <br /> professores.</span>
                </div>
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select 
                        name="subject" 
                        label="Matéria"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        options={[
                            { value: 'Artes', label: 'Artes'},
                            { value: 'Biologia', label: 'Biologia'},
                            { value: 'Ciências', label: 'Ciências'},
                            { value: 'Educação Física', label: 'Educação Física'},
                            { value: 'Física', label: 'Física'},
                            { value: 'Geografia', label: 'Geografia'},
                            { value: 'História', label: 'História'},
                            { value: 'Matemática', label: 'Matemática'},
                            { value: 'Português', label: 'Português'},
                            { value: 'Química', label: 'Química'},
                        ]}
                        required
                    />
                    <Select 
                        name="week_day" 
                        label="Dia da semana"
                        value={week_day}
                        onChange={e => setWeekDay(e.target.value)}
                        options={[
                            { value: '0', label: 'Domingo'},
                            { value: '1', label: 'Segunda-feira'},
                            { value: '2', label: 'Terça-feira'},
                            { value: '3', label: 'Quarta-feira'},
                            { value: '4', label: 'Quinta-feira'},
                            { value: '5', label: 'Sexta-feira'},
                            { value: '6', label: 'Sábado'},
                        ]}
                        required
                    />
                    <Input 
                        type="time" 
                        name="time" 
                        label="Hora"
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        required
                    />

                    <button type="submit">
                        Procurar
                    </button>
                </form>
            </PageHeader>

            <main>
                {teachers.length ? teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} /> }) :
                    <p id="not-found">Nenhum professor encontrado <br /> com sua pesquisa.</p>
                }
                { teachers.length ? 
                    (
                        <div id="all-results-container">
                            <span id="all-results">Estes são todos os resultados</span>
                        </div>
                    )
                    : null
                }
            </main>

            
        </div>
    )
}

export default TeacherList;