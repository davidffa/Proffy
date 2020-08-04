import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars1.githubusercontent.com/u/66310990?s=460&v=4" alt="D"/>
                <div>
                    <strong>David</strong>
                    <span>Química</span>
                </div>
            </header>

            <p>
                Temp text
                <br /><br />
                Temp text2
            </p>
            <footer>
                <p>
                    Preço/hora
                    <strong>5€</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp"/>
                    Entrar em contacto
                </button>
            </footer>
        </article>
    );
}

export default TeacherItem;