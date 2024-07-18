import React from 'react';
import styles from './style.module.scss';

const LoginTab = ({ activeTab, handleTabClick }) => {
    return (
        <div className={styles.tabs}>
        <button
            id="login-tab"
            className={`${styles.tabButton} ${activeTab === 'login' ? styles.active : ''}`}
            onClick={() => handleTabClick('login')}
        >
            Log in
        </button>
        <button
            id="signup-tab"
            className={`${styles.tabButton} ${activeTab === 'signup' ? styles.active : ''}`}
            onClick={() => handleTabClick('signup')}
        >
            Sign Up
        </button>
        </div>
    );
};

export default LoginTab;
