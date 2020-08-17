import React, { useState, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import InputMask from 'react-input-mask';

import { useAuth } from '../../contexts/auth';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import DropZone from '../../components/DropZone';

import warningIcon from '../../assets/images/icons/warning.svg';
import check from '../../assets/images/icons/check.svg';

import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import api from '../../services/api';

import './styles.css';

interface Schedule {
    week_day: number,
    from: string,
    to: string;
}

function Profile() {
    const { user } = useAuth();
    const history = useHistory();

    const [name, setName] = useState(user?.name);
    const [surname, setSurname] = useState(user?.surname);
    const [email, setEmail] = useState(user?.email);
    const [whatsapp, setWhatsapp] = useState(user?.whatsapp ? user.whatsapp : '');
    const [bio, setBio] = useState(user?.bio ? user.bio : '');

    const [selectedFile, setSelectedFile] = useState<File>();

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState(''); 

    const [scheduleItems, setScheduleItems] = useState<Array<Schedule>>([]);

    useEffect(() => {
        if (subject !== '') {
            const classCost = document.getElementById('class-cost');

            if (classCost) {
                classCost.setAttribute('required', '');
            }
        }
    }, [subject]);

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

    async function handleUpdateDataSubmit(e: FormEvent) {
        e.preventDefault();

        const data = new FormData();

        data.append('name', name as string);
        data.append('surname', surname as string);
        data.append('email', email as string);
        data.append('whatsapp', whatsapp as string);
        data.append('bio', bio as string);
        
        if (selectedFile)
            data.append('avatar', selectedFile);
        
        if (subject) {
            data.append('subject', subject as string);
            data.append('cost', cost as string);
            data.append('schedule', JSON.stringify(scheduleItems));
        }
        
        await api.post('update', data);

        const overlay = document.getElementById("overlay");

        if (overlay)
            overlay.style.height = "100%";
    }

    function handleGoHome() {
        history.push('/');
    }

    return (
        <div id="profile-container">
            <div id="overlay">
                <img src={check} alt="Check"/>
                <h1>Atualização de perfil concluída</h1>

                <h5>Dados atualizados com sucesso <br /> atualize sempre que precisar!</h5>

                <button onClick={handleGoHome}>Voltar à home</button>
            </div>

            <PageHeader headerTitle="Meu perfil">
                <DropZone onFileUpload={setSelectedFile} avatar={user?.avatar}/>
                <strong>{`${name} ${surname}`}</strong>
            </PageHeader>

            <main>
                <form onSubmit={handleUpdateDataSubmit}>
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

                        <div className="input-block">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <InputMask 
                                mask="+3\5\1 999 999 999" 
                                id="whatsapp" 
                                className="whatsapp-input" 
                                value={whatsapp} 
                                onChange={e => setWhatsapp(e.target.value)} 
                                required
                            />
                        </div>
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