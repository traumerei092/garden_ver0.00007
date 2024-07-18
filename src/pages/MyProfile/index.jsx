import React, { useState, useEffect } from 'react'
import styles from "./style.module.scss";
import Container from '../../layout/Container';
import Header from '../../layout/Header';
import Profile from '../../components/Profile';
import axios from 'axios';
import Footer from '../../layout/Footer';

const MyProfile = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost/Garden_v0.0005/php/getUserInfo.php', {
                    withCredentials: true
                });
                console.log('Response data:', response.data);
                if (response.data && !response.data.error) {
                    setUserInfo(response.data);
                    console.log('User Info Set:', response.data);
                } else {
                    console.error('Error:', response.data.error);
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };
        fetchUserInfo();
    }, []);

    console.log('User Info:', userInfo);

    return (
        <>
            <Container />
            <Header />
            <div className={styles.topContainer}>
                {userInfo ? <Profile userInfo={userInfo} /> : <p>Loading...</p>}
            </div>
            <Footer />
        </>
    )
}

export default MyProfile;