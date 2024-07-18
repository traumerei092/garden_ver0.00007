import React from 'react'
import { Link } from 'react-router-dom';
import styles from "./style.module.scss";
import logo from "../../images/garden_logo_orkney_font_fixed.png";

const Header = () => {
    return (
        <header>
            <div className={styles.headerLeft}>
                <Link to="/mypage">
                    <img src={logo} alt="" />
                </Link>
            </div>
            <div className={styles.headerRight} id="weather">
            </div>
        </header>
    )
}

export default Header;