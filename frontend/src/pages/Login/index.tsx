import React, { FormEvent, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import SideImage from '../../components/SideImage';
import PasswordInput from '../../components/PasswordInput';

import api from '../../services/api';

import purpleHeart from '../../assets/images/icons/purple-heart.svg';
import checkbox from '../../assets/images/icons/checkbox.svg';
import square from '../../assets/images/icons/square.svg';

import './styles.css';

function Login() {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    useEffect(() => {
        const button = document.getElementById('submit-button');
        if (!button) return;

        let regExEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (regExEmail.test(email) && password.length >= 8) {
            button.style.cursor = 'pointer';
            button.style.backgroundColor = '#04D361'
            button.style.color = '#FFF';
        }else {
            button.style.cursor = 'not-allowed';
            button.style.backgroundColor = '#DCDCE5';
            button.style.color = '#9C98A6';
        }
    }, [email, password]);

    async function handleLogin(e: FormEvent) {
        e.preventDefault();

        try {
            const res = await api.post('login', {
                email,
                password
            });
            
            if (remember) {
                try {
                    localStorage.setItem('token', res.data.token);
                    history.push('/home');
                } catch(err) {
                    alert('Ocorreu um erro! Ative o armazenamento local do seu browser.')
                } 
            }else {
                try {
                    sessionStorage.setItem('token', res.data.token);
                    history.push('/home');
                } catch(err) {
                    alert('Ocorreu um erro! Ative o armazenamento local do seu browser.')
                } 
            }
        }catch (err) {
            alert('Email ou password incorretos!');
        }
    }

    return (
        <div id="login-container">
            <SideImage />
            
            <div className="form-container">
                <form className="login-form" onSubmit={handleLogin}>
                    <fieldset>
                        <legend>Fazer login</legend>

                        <div className="login-input-block">
                            <div className="email">
                                <input 
                                    type="email" 
                                    placeholder="E-mail" 
                                    className="email-input"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <PasswordInput
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        
                        <div className="form-footer">
                            <label onClick={e => setRemember(!remember)}>
                                {!remember 
                                    ? (
                                        <img src={square} alt="Checkbox" />
                                    )
                                    : (
                                        <img src={checkbox} alt="Checkbox" />
                                    )
                                }
                                <span>Lembrar-me</span>
                            </label>
                            
                            <Link className="forgot-password" to="forgotpassword">Esqueci minha senha</Link>
                        </div>
                    </fieldset>

                    <button id="submit-button" type="submit">Entrar</button>
                </form>

                <footer>
                    <div className="no-acc">
                        <p>Não tem conta?</p>
                        <Link to="register">Registe-se</Link>
                    </div>
                    

                    <p className="free-text">É de graça <img src={purpleHeart} alt="purpleHeart" /></p>
                </footer>
            </div>
        </div>
    );
}

export default Login;