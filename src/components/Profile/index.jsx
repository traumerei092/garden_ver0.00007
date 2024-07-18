import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import icon from "../../images/default_profile_image.png";

const Profile = ({ userInfo }) => {
    console.log('Profile userInfo:', userInfo);

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/mypage');
    };

    const handleEditClick = () => {
        navigate('/editprofile');
    };

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileImage}>
                <img src={icon} alt="Profile Image" />
            </div>
            <div className={styles.profileInfo}>
                <div className={styles.profileInfoContent}>
                    <div className={styles.profileInfoContentLeft}>
                        <p>Name</p>
                        <p>Age</p>
                        <p>Email</p>
                        <p>My Shop</p>
                    </div>
                    <div className={styles.profileInfoContentCenter}>
                        <p>：</p>
                        <p>：</p>
                        <p>：</p>
                        <p>：</p>
                    </div>
                    <div className={styles.profileInfoContentRight}>
                        <p>{userInfo ? userInfo.name : 'No name'}</p>
                        <p>{userInfo ? userInfo.age : 'No age'}</p>
                        <p>{userInfo ? userInfo.mail : 'No mail'}</p>
                        <p>{userInfo ? userInfo.my_shop : 'No shop'}</p>
                    </div>
                </div>
            </div>
                <div className={styles.profileActions}>
                <button id="back-btn" onClick={handleBackClick}>Back</button>
                <button id="edit-btn" onClick={handleEditClick}>Edit</button>
            </div>
        </div>
    );
};

export default Profile;
