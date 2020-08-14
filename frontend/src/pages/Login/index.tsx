import React, { FormEvent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/auth';

import SideImage from '../../components/SideImage';
import PasswordInput from '../../components/PasswordInput';

import purpleHeart from '../../assets/images/icons/purple-heart.svg';
import checkbox from '../../assets/images/icons/checkbox.svg';
import square from '../../assets/images/icons/square.svg';

import './styles.css';

function Login() {
    const { signIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    useEffect(() => {
        const button = document.getElementById('submit-button');
        if (!button) return;

        const regExEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

    const regExEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    function buttonHover() {
        const button = document.getElementById('submit-button');

        if (!button) return;

        if (regExEmail.test(email)) {
            button.style.backgroundColor = '#04BF58'
        }
    }

    function removeHover() {
        const button = document.getElementById('submit-button');

        if (!button) return;

        if (regExEmail.test(email)) {
            button.style.backgroundColor = '#04D361'
        }   
    }

    async function handleLogin(e: FormEvent) {
        e.preventDefault();

        await signIn(email, password, remember);
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

                    <button id="submit-button" type="submit" onMouseOver={buttonHover} onMouseOut={removeHover}>Entrar</button>
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