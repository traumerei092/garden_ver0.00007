import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import icon from "../../images/default_profile_image.png";
import axios from 'axios';

const EditProfile = ({ userInfo, shops }) => {
    const [formData, setFormData] = useState({ ...userInfo });
    const navigate = useNavigate();

    useEffect(() => {
        // userInfo.shop_idが存在する場合にのみ実行
        if (userInfo.shop_id) {
            setFormData(prevData => ({ ...prevData, shop: userInfo.shop_id }));
        }
    }, [userInfo.shop_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data on submit:', formData);
        try {
            const response = await axios.post('http://localhost/Garden_v0.0005/php/editProfile.php', formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (response.data.status === 'success') {
                navigate('/myprofile');
            } else {
                console.error('Error updating profile:', response.data.message);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleBackClick = () => {
        navigate('/myprofile');
    };

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileImage}>
                <img src={icon} alt="Profile Image" />
            </div>
            <form className={styles.profileInfo} onSubmit={handleSubmit}>
                <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} />
                <input type="text" name="age" id="age" required value={formData.age} onChange={handleChange} />
                <input type="email" name="mail" id="mail" required value={formData.mail} onChange={handleChange} />
                <select name="shop" id="shop" required value={formData.shop} onChange={handleChange}>
                    <option value="" hidden>My Shop</option>
                    {shops.map((shop) => (
                        <option key={shop.id} value={shop.id}>{shop.shop_name}</option>
                    ))}
                </select>
                <button type="submit">Update Profile</button>
            </form>
            <button className={styles.backButton} onClick={handleBackClick}>Back</button>
        </div>
    );
};

export default EditProfile;
