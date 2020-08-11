import React from 'react';

import bgImage from '../../assets/images/background-image.svg';
import purpleHeart from '../../assets/images/icons/purple-heart.svg';
import eye from '../../assets/images/icons/eye.svg';

import './styles.css';

function Login() {
    return (
        <div id="login-container">
            <div className="img-container">
                <img src={bgImage} alt="Proffy" className="bg-image" />
            </div>
            
            <div className="form-container">
                <form className="login-form">
                    <fieldset>
                        <legend>Fazer login</legend>

                        <input type="email" placeholder="E-mail" className="email-input" />
                        
                        <div className="password">
                            <input type="password" placeholder="Senha" className="password-input" />
                            <img src={eye} alt="Mostrar" />
                        </div>
                        
                        <div className="form-footer">
                            <input type="checkbox" className="checkbox" />
                            <label>Lembrar-me</label>

                            <a className="forgot-password" href="forgotpassword">Esqueci minha senha</a>
                        </div>
                    </fieldset>

                    <button>Entrar</button>
                </form>

                <footer>
                    <div className="no-acc">
                        <p>Não tem conta?</p>
                        <a href="register">Registe-se</a>
                    </div>
                    

                    <p className="free-text">É de graça <img src={purpleHeart} alt="purpleHeart" /></p>
                </footer>
            </div>
        </div>
    );
}

export default Login;