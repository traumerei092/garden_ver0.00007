import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import axios from 'axios';

const DownMenu = ({ isMenuVisible, toggleMenu }) => {
    console.log('DownMenu visibility:', isMenuVisible);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.get('http://localhost/Garden_v0.0005/php/logout.php', {
                withCredentials: true
            });
            if (response.data.status === 'success') {
                navigate('/');
            } else {
                console.error('Logout failed:', response.data.message);
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const response = await axios.post('http://localhost/Garden_v0.0005/php/deleteUser.php', {}, {
                withCredentials: true
            });
            if (response.data.status === 'success') {
                navigate('/');
            } else {
                console.error('Error deleting account:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    return (
        <div id="downMenu" className={`${styles.downMenu} ${isMenuVisible ? styles.active : ''}`}>
            <ul>
                <li><Link to="/myprofile" onClick={toggleMenu}>プロフィール</Link></li>
                <li><Link to="/" onClick={handleLogout}>ログアウト</Link></li>
                <li><Link to="/" onClick={handleDeleteAccount}>退会</Link></li>
            </ul>
            <button id="close-btn" onClick={toggleMenu}>×</button>
        </div>
    );
};

export default DownMenu;
