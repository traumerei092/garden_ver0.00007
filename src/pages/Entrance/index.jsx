import React, { useState, useEffect } from 'react'
import styles from "./style.module.scss";
import Container from '../../layout/Container';
import Footer from '../../layout/Footer';
import MyHeader from '../../layout/MyHeader';
import EntryButton from '../../components/EntryButton';
import DownMenu from '../../components/DownMenu';

const Entrance = () => {

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
                <EntryButton />
            </div>
            <Footer />
        </>
    )
}

export default Entrance;