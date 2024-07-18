import React from 'react'
import styles from './style.module.scss';
import FooterButton from '../../components/FooterButton';
import home from '../../images/home.png';
import heart from '../../images/heart.png';
import login from '../../images/login.png';
import talk from '../../images/talk.png';
import setting from '../../images/setting.png';

const Footer = () => {
    return (
        <footer>
            <FooterButton imageSrc={home} altText="Image 1"  navigateTo="/mypage" />
            <FooterButton imageSrc={heart} altText="Image 2" />
            <FooterButton imageSrc={login} altText="Image 3"  navigateTo="/entrance" />
            <FooterButton imageSrc={talk} altText="Image 4" />
            <FooterButton imageSrc={setting} altText="Image 5" />
        </footer>
    )
}

export default Footer;