import React, { useEffect, useState, FormEvent } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import api from '../../services/api';

import SideImage from '../../components/SideImage';

import './styles.css';
import PasswordInput from '../../components/PasswordInput';

function ResetPassword() {
    const history = useHistory();
    const { search } = useLocation();

    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (search.startsWith('?token=')) {
            setToken(search.slice(7));
        }else {
            history.push('/');
        }
    }, [search, history]);
    
    useEffect(() => {
        const button = document.getElementById('button');

        if (!button) return;

        if (password.length >= 8) {
            button.style.cursor = 'pointer';
            button.style.backgroundColor = '#04D361'
            button.style.color = '#FFF';
        }else {
            button.style.cursor = 'not-allowed';
            button.style.backgroundColor = '#DCDCE5';
            button.style.color = '#9C98A6';
        }
    }, [password]);

    async function handleChangePassword(e: FormEvent) {
        e.preventDefault();

        try {
            await api.post('reset_password', {
                token,
                password
            });
        }catch (err) {
            alert('Token inválido! Obtenha um novo');
            history.push('/forgotpassword');
        }
    }

    function buttonHover() {
        const button = document.getElementById('button');

        if (!button) return;

        if (password.length >= 8) {
            button.style.backgroundColor = '#04BF58'
        }
    }

    function removeHover() {
        const button = document.getElementById('button');

        if (!button) return;

        if (password.length >= 8) {
            button.style.backgroundColor = '#04D361'
        }   
    }

    return (
        <div id="reset-password-container">
            <SideImage />

            <div className="reset-password-form-container">
                <form onSubmit={handleChangePassword} className="reset-password-form">
                    <legend>Escolha uma nova password.</legend>

                    <fieldset>
                        <PasswordInput
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </fieldset>

                    <button id="button" type="submit" onMouseOver={buttonHover} onMouseOut={removeHover}>Alterar Senha</button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;