import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

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
        <div/>
    );
}

export default ResetPassword;