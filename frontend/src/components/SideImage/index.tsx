import React from 'react';

import bgImage from '../../assets/images/background-image.svg';

import './styles.css';

function SideImage() {
    return (
        <div className="img-container">
            <img src={bgImage} alt="Proffy" className="bg-image" />
        </div>
    )
}

export default SideImage;