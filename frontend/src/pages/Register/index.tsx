import React from 'react';

import SideImage from '../../components/SideImage';
import goBack from '../../assets/images/icons/back.svg';

import './styles.css';
import PasswordInput from '../../components/PasswordInput';

function Register() {
    return (
        <div id="register-container">
            <div className="register-form-container">
                <img src={goBack} alt="Voltar" className="back"/>
                
                <form className="register-form">
                    <legend>Registo</legend>
                    <h5>Preencha os dados abaixo <br /> para começar.</h5>

                    <fieldset>
                        <input
                            type="text"
                            placeholder="Nome"
                            className="name-input"
                            required
                        />

                        <input
                            type="text"
                            placeholder="Sobrenome"
                            className="surname-input"
                            required
                        />

                        <input
                            type="email"
                            placeholder="E-mail"
                            className="email-input"
                            required
                        />
                        
                        <PasswordInput />
                        
                    </fieldset>

                    <button>Concluir Registo</button>
                </form>
            </div>

            <SideImage />
        </div>
    );
}

export default Register;