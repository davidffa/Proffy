import React, { useEffect, useState } from 'react';
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

    async function handleChangePassword() {
        try {
            await api.post('reset_password', {
                token,
                password
            });
        }catch (err) {
            alert('Token inválido!');
        }
    }

    return (
        <div id="reset-password-container">
            <SideImage />

            <div className="reset-password-form-container">
                <form onSubmit={handleChangePassword} className="reset-password-form">
                    <legend>Escolha uma nova password.</legend>

                    <fieldset>
                        <PasswordInput />
                    </fieldset>

                    <button type="submit">Alterar Senha</button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;