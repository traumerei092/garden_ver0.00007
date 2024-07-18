import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';

const FooterButton = ({ imageSrc, altText, navigateTo }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        if (navigateTo) {
            navigate(navigateTo);
        }
    };

    return (
        <div className={styles.footerButton} onClick={handleClick}>
            <button>
                <img src={imageSrc} alt={altText} />
            </button>
        </div>
    );
};

export default FooterButton;
