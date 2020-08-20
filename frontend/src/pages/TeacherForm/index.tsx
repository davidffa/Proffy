import React, { useState, FormEvent } from 'react';
import InputMask from 'react-input-mask';

import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';

import warningIcon from '../../assets/images/icons/warning.svg';

import api from '../../services/api';

import './styles.css';

function TeacherForm() {
    const { user } = useAuth();

    const history = useHistory();

    const [whatsapp, setWhatsapp] = useState(user?.whatsapp as string);
    const [bio, setBio] = useState(user?.bio as string);

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: ''}
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: ''}
        ])
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value };
            }

            return scheduleItem;
        });

        setScheduleItems(updatedScheduleItems);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Registo realizado com sucesso');

            history.push('/');
        }).catch(err => {
            alert('Erro ao tentar registar!');
        });
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição"
                headerTitle="Dar aulas"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                <fieldset>
                    <legend>Seus dados</legend>

                    <div className="userinfo-container">
                        <div className="username-container">
                            <img src={`http://localhost:3333/uploads/${user?.avatar}`} alt="Avatar" className="avatar-image"/>
                            <strong>{user?.name} {user?.surname}</strong>
                        </div>

                        <div className="input-block">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <InputMask 
                                mask="+351 999 999 999" 
                                value={whatsapp} 
                                onChange={e => setWhatsapp(e.target.value)} 
                                required
                            />
                        </div>
                    </div>

                    
                    <Textarea 
                        name="bio" 
                        label="Biografia (máximo 300 caracteres)" 
                        value={bio} 
                        onChange={e => setBio(e.target.value)} 
                        maxLength={300}
                        required
                    />
                </fieldset>

                <fieldset>
                    <legend>Sobre a aula</legend>

                    <div className="class-info">
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
                        />
                        <Input 
                            name="cost" 
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            id="class-cost"
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        Horários disponíveis
                        <button type="button" onClick={addNewScheduleItem}>
                            + Novo horário
                        </button>
                    </legend>
                    
                    {scheduleItems.map((scheduleItem, index) => {
                        return (
                            <div key={scheduleItem.week_day} className="schedule-item">
                                <Select 
                                    name="week_day" 
                                    label="Dia da semana"
                                    value={scheduleItem.week_day}
                                    onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
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
                                    name="from" 
                                    label="Das" 
                                    value={scheduleItem.from}
                                    type="time"
                                    onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                    required
                                />
                                <Input 
                                    name="to" 
                                    label="Até"
                                    value={scheduleItem.to} 
                                    type="time" 
                                    onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                    required
                                />
                            </div>
                            )
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar registo
                        </button>
                    </footer>
                </form>   
            </main>
        </div>
    )
}

export default TeacherForm;