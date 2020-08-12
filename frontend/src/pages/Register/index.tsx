import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PasswordInput from '../../components/PasswordInput';

import api from '../../services/api';

import SideImage from '../../components/SideImage';
import goBack from '../../assets/images/icons/back.svg';
import check from '../../assets/images/icons/check.svg';

import './styles.css';

function Register() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleRegister(e: FormEvent) {
        e.preventDefault();

        try {
            await api.post('/register', {
                name,
                surname,
                email,
                password,
            });

            const overlay = document.getElementById("overlay");
            if (overlay)
                overlay.style.height = "100%";
        }catch (err) {
            alert('Já existe uma conta com esse e-mail!')
        }
    }

    function handleGoBack() {
        history.push('/');
    }

    return (
        <div id="register-container">
            <div id="overlay">
                <img src={check} alt="Check"/>
                <h1>Registo concluído</h1>

                <h5>Agora você faz parte da plataforma Proffy <br /> Tenha uma ótima experiência</h5>

                <button onClick={handleGoBack}>Fazer login</button>
            </div>
            <div className="register-form-container">
                <img 
                    src={goBack} 
                    alt="Voltar" 
                    className="back"
                    onClick={handleGoBack}
                />
                
                <form onSubmit={handleRegister} className="register-form">
                    <legend>Registo</legend>
                    <h5>Preencha os dados abaixo <br /> para começar.</h5>

                    <fieldset>
                        <input
                            type="text"
                            placeholder="Nome"
                            className="name-input"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />

                        <input
                            type="text"
                            placeholder="Sobrenome"
                            className="surname-input"
                            value={surname}
                            onChange={e => setSurname(e.target.value)}
                            required
                        />

                        <input
                            type="email"
                            placeholder="E-mail"
                            className="email-input"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        
                        <PasswordInput
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        
                    </fieldset>

                    <button type="submit">Concluir Registo</button>
                </form>
            </div>

            <SideImage />
        </div>
    );
}

export default Register;