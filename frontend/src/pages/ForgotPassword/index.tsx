import React, { useState, useEffect, FormEvent } from 'react';
import { useHistory } from 'react-router-dom'; 

import api from '../../services/api';

import SideImage from '../../components/SideImage';

import goBack from '../../assets/images/icons/back.svg';
import check from '../../assets/images/icons/check.svg';

import './styles.css';

function ForgotPassword() {
    const history = useHistory();

    const [email, setEmail] = useState('');

    useEffect(() => {
        const regExEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const button = document.getElementById('sendbutton');

        if (!button) return;

        if (regExEmail.test(email)) {
            button.style.cursor = 'pointer';
            button.style.backgroundColor = '#04D361'
            button.style.color = '#FFF';
        }else {
            button.style.cursor = 'not-allowed';
            button.style.backgroundColor = '#DCDCE5';
            button.style.color = '#9C98A6';
        }
    }, [email]);

    const regExEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    function buttonHover() {
        const button = document.getElementById('sendbutton');

        if (!button) return;

        if (regExEmail.test(email)) {
            button.style.backgroundColor = '#04BF58'
        }
    }

    function removeHover() {
        const button = document.getElementById('sendbutton');

        if (!button) return;

        if (regExEmail.test(email)) {
            button.style.backgroundColor = '#04D361'
        }   
    }

    async function handleForgotPassword(e: FormEvent) {
        e.preventDefault();

        try {
            await api.post('forgot_password', {
                email,
            });

            const overlay = document.getElementById("overlay");
            if (overlay)
                overlay.style.height = "100%";
        }catch (err) {
            alert('E-mail não encontrado!')
        }
    }

    function handleGoBack() {
        history.push('/');
    }

    return (
        <div id="forgot-password-container">
            <div id="overlay">
                <img src={check} alt="Check"/>
                <h1>Redefinição enviada</h1>

                <h5>Boa, agora é só verificar o e-mail que foi enviado para você <br /> redefinir sua senha e aproveitar seus estudos</h5>

                <button onClick={handleGoBack}>Voltar ao login</button>
            </div>

            <div className="form-container">
                <img src={goBack} alt="Voltar" onClick={handleGoBack} />
                <form onSubmit={handleForgotPassword} className="forgot-password-form">
                    <legend>Esqueceu sua senha?</legend>
                    <span>Não se preocupe, vamos resolver isso.</span>
                    <fieldset>
                        <input 
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </fieldset>

                    <button type="submit" id="sendbutton" onMouseOver={buttonHover} onMouseOut={removeHover}>Enviar</button>
                </form>
            </div>
            
            <SideImage />
        </div>
    )
}

export default ForgotPassword;