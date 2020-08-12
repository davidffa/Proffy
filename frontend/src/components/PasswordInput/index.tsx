import React, { useState, useEffect, InputHTMLAttributes } from 'react';

import eye from '../../assets/images/icons/eye.svg';
import eyeDivided from '../../assets/images/icons/eye-divided.svg';

import './styles.css';

const PasswordInput: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...rest }) => {
    const [visiblePassword, setVisiblePassword] = useState(false);

    useEffect(() => {
        const password = document.getElementById('password') as HTMLInputElement;

        if (visiblePassword) {
            password.type = 'text';
        }else {
            password.type = 'password';
        }
    }, [visiblePassword]);

    return (
        <div className="password">
            <input 
                type="password" 
                placeholder="Senha" 
                className="password-input"
                id="password"
                required
                minLength={8}
                {...rest}
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
    );
}

export default PasswordInput;