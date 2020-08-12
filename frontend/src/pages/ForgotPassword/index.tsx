import React from 'react'; 

import goBack from '../../assets/images/icons/back.svg';
import SideImage from '../../components/SideImage';

import './styles.css';

function ForgotPassword() {
    return (
        <div id="forgot-password-container">
            <div className="form-container">
                <img src={goBack} alt="Voltar" />
                <form className="forgot-password-form">
                    <legend>Esqueceu sua senha?</legend>
                    <span>Não se preocupe, vamos resolver isso.</span>
                    <fieldset>
                        <input 
                            type="email"
                            placeholder="E-mail"
                            required
                        />
                    </fieldset>

                    <button type="submit">Enviar</button>
                </form>
            </div>
            
            <SideImage />
        </div>
    )
}

export default ForgotPassword;