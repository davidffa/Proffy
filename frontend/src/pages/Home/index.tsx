import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts/auth';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import logoutIcon from '../../assets/images/icons/logout.svg'

import api from '../../services/api';

import './styles.css';

function Home() {
    const history = useHistory();
    const { user, signOut } = useAuth();

    let avatar = 'default.png';

    if (user?.avatar)
        avatar = user.avatar;

    const avatarURL = `http://192.168.1.67:3333/uploads/${avatar}`;

    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(() => {
        api.get('connections').then(res => {
            const { total } = res.data;

            setTotalConnections(total);
        });
    }, []);

    function goProfile() {
        history.push('/profile');
    }

    function handleLogout() {
        signOut();
    }

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <header>
                    <div className="avatar-container" onClick={goProfile}>
                        <img src={avatarURL} alt="Avatar"/>
                        <strong>{user?.name} {user?.surname}</strong>
                    </div>

                    <img 
                        src={logoutIcon} 
                        alt="Logout" 
                        className="logout"
                        onClick={handleLogout} 
                    />
                </header>
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy"/>
                    <h2>Sua plataforma de estudos online.</h2>
                </div>

                <img
                    src={landingImg} 
                    alt="hero"
                    className="hero-image"
                />                

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Estudar"/>
                        Estudar
                    </Link>

                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="Dar aulas"/>
                        Dar aulas
                    </Link>
                </div>

                <span className="total-connections">
                    Total de {totalConnections} conexões já realizadas <img src={purpleHeartIcon} alt="Coração Púrpura"/>
                </span>
            </div>
        </div>
    );
}

export default Home;