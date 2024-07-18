import React, { useState, useEffect } from 'react'
import styles from "./style.module.scss";
import Container from '../../layout/Container';
import MyHeader from '../../layout/MyHeader';
import DownMenu from '../../components/DownMenu';
import Footer from '../../layout/Footer';
import ShopData from '../../components/ShopData';

const MyPage = () => {
    const [isMenuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        console.log('Toggle Menu clicked');
        setMenuVisible(!isMenuVisible);
        console.log('Menu visibility:', !isMenuVisible);
    };

    return (
        <>
            <Container />
            <MyHeader toggleMenu={toggleMenu}  />
            <div className={styles.topContainer}>
                <DownMenu isMenuVisible={isMenuVisible} toggleMenu={toggleMenu} />
                <ShopData />
            </div>
            <Footer />
        </>
    )
}

export default MyPage;