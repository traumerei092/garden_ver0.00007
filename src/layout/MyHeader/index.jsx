import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styles from "./style.module.scss";
import logo from "../../images/garden_logo_orkney_font_fixed.png";
import icon from "../../images/default_profile_image.png";
import axios from 'axios';

const MyHeader = ({ toggleMenu }) => {

    const [currentShop, setCurrentShop] = useState('');

    useEffect(() => {
        const fetchCurrentShop = async () => {
            try {
                const response = await axios.get('http://localhost/Garden_v0.0005/php/getCurrentShop.php', {
                    withCredentials: true
                });
                if (response.data.shop_name) {
                    setCurrentShop(response.data.shop_name);
                }
            } catch (error) {
                console.error('Error fetching current shop:', error);
            }
        };

        fetchCurrentShop();
    }, []);

    return (
        <header>
            <div className={styles.headerLeft}>
                <Link to="/mypage">
                    <img src={logo} alt="" />
                </Link>
            </div>
            <div className={styles.headerRight} id="weather">
                {currentShop && <p className={styles.entryShop}>{currentShop}</p>}
                <button onClick={toggleMenu}>
                    <img src={icon} alt="" />
                </button>
            </div>
        </header>
    )
}

export default MyHeader;