import React, { FormEvent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import bgImage from '../../assets/images/background-image.svg';
import purpleHeart from '../../assets/images/icons/purple-heart.svg';
import eye from '../../assets/images/icons/eye.svg';
import eyeDivided from '../../assets/images/icons/eye-divided.svg';

import './styles.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [visiblePassword, setVisiblePassword] = useState(false);

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

    useEffect(() => {
        const password = document.getElementById('password') as HTMLInputElement;

        if (visiblePassword) {
            password.type = 'text';
        }else {
            password.type = 'password';
        }
    }, [visiblePassword]);

    async function handleLogin(e: FormEvent) {
        e.preventDefault();

        try {
            const res = await api.post('login', {
                email,
                password
            });

            console.log(res.data);
            
            if (remember) {
                try {
                    localStorage.setItem('token', res.data.token);
                } catch(err) {
                    alert('Ocorreu um erro! Ative o armazenamento local do seu browser.')
                } 
            }else {
                try {
                    sessionStorage.setItem('token', res.data.token);
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
            <div className="img-container">
                <img src={bgImage} alt="Proffy" className="bg-image" />
            </div>
            
            <div className="form-container">
                <form className="login-form" onSubmit={handleLogin}>
                    <fieldset>
                        <legend>Fazer login</legend>

                        <input 
                            type="email" 
                            placeholder="E-mail" 
                            className="email-input"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            autoComplete="on"
                        />
                        
                        <div className="password">
                            <input 
                                type="password" 
                                placeholder="Senha" 
                                className="password-input"
                                id="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                minLength={8}
                            />

                            {!visiblePassword 
                                ? (
                                    <img 
                                        src={eye} 
                                        alt="Mostrar"
                                        className="eye"
                                        onClick={e => setVisiblePassword(true)}
                                    />
                                )
                                : (
                                    <img 
                                        src={eyeDivided} 
                                        alt="Esconder"
                                        className="eyeDivided"
                                        onClick={e => setVisiblePassword(false)}
                                    />
                                )
                            }
                            
                        </div>
                        
                        <div className="form-footer">
                            <input 
                                type="checkbox" 
                                className="checkbox"
                                onClick={e => setRemember(!remember)}
                            />
                            <label>Lembrar-me</label>

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