import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import LoginTab from '../LoginTab';
import useLoginTab from '../../hooks/useLoginTab';
import axios from 'axios';

const LoginForm = () => {
    const { activeTab, handleTabClick } = useLoginTab();
    const [signupData, setSignupData] = useState({
        name: '',
        age: '',
        email: '',
        password: '',
        shop: '',
        profile_image: null
    });
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [shops, setShops] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const response = await axios.get('http://localhost/Garden_v0.0005/php/getShops.php');
                console.log('Fetched shops:', response.data);
                if (response.data && Array.isArray(response.data)) {
                    setShops(response.data);
                } else {
                    console.error('Expected an array but got:', response.data);
                }
            } catch (error) {
                console.error('Error fetching shops:', error);
            }
        };
        fetchShops();
    }, []);

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSignupFileChange = (e) => {
        setSignupData((prevData) => ({ ...prevData, profile_image: e.target.files[0] }));
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in signupData) {
            formData.append(key, signupData[key]);
        }
        try {
            const response = await axios.post('http://localhost/Garden_v0.0005/php/signup.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            console.log('Signup response:', response.data);
            if (response.data.status === 'success') {
                localStorage.setItem('user_id', response.data.user_id);
                console.log('Navigating to /mypage');
                navigate('/mypage');
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting login data:', loginData);
        try {
            const response = await axios.post('http://localhost/Garden_v0.0005/php/login.php', loginData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            console.log('Login response:', response.data);
            console.log('Login response data:', response.data);
            if (response.data.status === 'success') {
                localStorage.setItem('user_id', response.data.user_id);
                console.log('Navigating to /mypage');
                navigate('/mypage');
            } else {
                console.error('Login error:', response.data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <>
        <LoginTab activeTab={activeTab} handleTabClick={handleTabClick} />

        {activeTab === 'login' && (
            <div className={`${styles.formContainer} ${activeTab === 'login' ? styles.active : ''}`} id="login-form-container">
            <form id="login-form" onSubmit={handleLoginSubmit}>
                <h2>Log in</h2>
                <input type="email" name="email" id="login-email" placeholder="Email" required value={loginData.email} onChange={handleLoginChange} />
                <input type="password" name="password" id="login-password" placeholder="Password" required value={loginData.password} onChange={handleLoginChange} />
                <button type="submit">Login</button>
            </form>
            </div>
        )}

        {activeTab === 'signup' && (
            <div className={`${styles.formContainer} ${activeTab === 'signup' ? styles.active : ''}`} id="signup-form-container">
            <form id="signup-form" onSubmit={handleSignupSubmit} encType="multipart/form-data">
                <h2>Sign Up</h2>
                <input type="text" name="name" id="signup-name" placeholder="Name" required value={signupData.name} onChange={handleSignupChange} />
                <input type="text" name="age" id="signup-age" placeholder="Age" required value={signupData.age} onChange={handleSignupChange} />
                <input type="email" name="email" id="signup-email" placeholder="Email" required value={signupData.email} onChange={handleSignupChange} />
                <select name="shop" id="shop" value={signupData.shop} onChange={handleSignupChange}>
                    <option value="" hidden>My Shop</option>
                        <option value="" hidden>My Shop</option>
                            {Array.isArray(shops) && shops.map((shop) => (
                                <option key={shop.id} value={shop.id}>{shop.shop_name}</option>
                            ))}
                </select>
                <input type="password" name="password" id="signup-password" placeholder="Password" required value={signupData.password} onChange={handleSignupChange} />
                <input type="file" name="profile_image" onChange={handleSignupFileChange} />
                <button type="submit">Sign Up</button>
            </form>
            </div>
        )}
        </>
    );
};

export default LoginForm;


