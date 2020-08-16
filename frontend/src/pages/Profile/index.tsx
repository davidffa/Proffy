import React, { useState } from 'react';

import { useAuth } from '../../contexts/auth';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';

import warningIcon from '../../assets/images/icons/warning.svg';
import camera from '../../assets/images/icons/camera.svg';

import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import './styles.css';

interface Schedule {
    week_day: number,
    from: string,
    to: string;
}

function Profile() {
    const { user } = useAuth();

    const [name, setName] = useState(user?.name);
    const [surname, setSurname] = useState(user?.surname);
    const [email, setEmail] = useState(user?.email);
    const [whatsapp, setWhatsapp] = useState(user?.whatsapp ? user.whatsapp : '');
    const [bio, setBio] = useState(user?.bio ? user.bio : '');
    const [avatar, setAvatar] = useState(user?.avatar);

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState(''); 

    const [scheduleItems, setScheduleItems] = useState<Array<Schedule>>([]);

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

    function deleteScheduleItem(index: number) {
        setScheduleItems(scheduleItems.filter((item, idx) => idx !== index));
    }

    return (
        <div id="profile-container">
            <PageHeader headerTitle="Meu perfil">
                <div className="avatar-container">
                    <img src={`http://localhost:3333/uploads/${avatar as string}`} alt="Avatar" className="avatar" />
                    <img src={camera} alt="Camera" className="camera" />
                </div>
                <strong>{`${name} ${surname}`}</strong>
            </PageHeader>

            <main>
                <form>
                <fieldset>
                    <legend>Seus dados</legend>

                    <div className="name-input">
                        <Input 
                            name="name" 
                            label="Nome" 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                            required
                        />
                        
                        <Input 
                            name="sobrenome" 
                            label="Sobrenome" 
                            value={surname} 
                            onChange={e => setSurname(e.target.value)} 
                            required
                        />
                    </div>

                    <div className="contact-input">
                        <Input 
                            name="email" 
                            label="E-mail" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            className="email-input"
                            required
                        />

                        <Input 
                            name="whatsapp" 
                            label="Whatsapp" 
                            value={whatsapp} 
                            onChange={e => setWhatsapp(e.target.value)} 
                            className="whatsapp-input"
                            required
                        />
                    </div>
                    
                    
                    <Textarea 
                        name="bio" 
                        label="Biografia" 
                        value={bio} 
                        onChange={e => setBio(e.target.value)} 
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
                            required
                        />
                        <Input 
                            name="cost" 
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            required
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
                            <div className="schedule-item-container">
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
                                <span onClick={e => deleteScheduleItem(index)}>Excluír horário</span>
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
    );
}

export default Profile;