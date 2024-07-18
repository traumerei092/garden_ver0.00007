import React, { useState, useEffect } from 'react'
import styles from "./style.module.scss";
import Container from '../../layout/Container';
import Header from '../../layout/Header';
import EditProfile from '../../components/EditProfile';
import axios from 'axios';
import Footer from '../../layout/Footer';

const EditMyProfile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [shops, setShops] = useState([]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost/Garden_v0.0005/php/getUserInfo.php', {
                    withCredentials: true
                });
                if (response.data && !response.data.error) {
                    setUserInfo(response.data);
                } else {
                    console.error('Error:', response.data.error);
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        const fetchShops = async () => {
            try {
                const response = await axios.get('http://localhost/Garden_v0.0005/php/getShops.php');
                if (response.data && Array.isArray(response.data)) {
                    setShops(response.data);
                } else {
                    console.error('Error fetching shops:', response.data);
                }
            } catch (error) {
                console.error('Error fetching shops:', error);
            }
        };

        fetchUserInfo();
        fetchShops();
    }, []);

    return (
        <>
            <Container />
            <Header />
            <div className={styles.topContainer}>
                {userInfo && <EditProfile userInfo={userInfo} shops={shops} />}
            </div>
            <Footer />
        </>
    );
}

export default EditMyProfile;