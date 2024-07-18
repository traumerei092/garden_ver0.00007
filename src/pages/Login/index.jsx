import React from 'react'
import styles from "./style.module.scss";
import Header from '../../layout/Header';
import Container from '../../layout/Container';
import LoginTab from '../../components/LoginTab';
import LoginForm from '../../components/LoginForm';

const Login = () => {
    return (
        <>
            <Container />
            <Header />
            <div className={styles.topContainer}>
                <LoginForm />
            </div>
        </>
    )
}

export default Login;