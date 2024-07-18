import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';

const EntryButton = () => {

    const [shops, setShops] = useState([]);
    const [defaultShop, setDefaultShop] = useState('');
    const [selectedShop, setSelectedShop] = useState('');
    const [shopName, setShopName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const response = await axios.get('http://localhost/Garden_v0.0005/php/getShops.php');
                setShops(response.data);
            } catch (error) {
                console.error('Error fetching shops:', error);
            }
        };

        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost/Garden_v0.0005/php/getUserInfo.php', {
                    withCredentials: true
                });
                setDefaultShop(response.data.shop_id);
                setSelectedShop(response.data.shop_id);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchShops();
        fetchUserInfo();
    }, []);

    const handleShopChange = (e) => {
        setSelectedShop(e.target.value);
        const shop = shops.find(shop => shop.id === parseInt(e.target.value));
        setShopName(shop ? shop.shop_name : '');
    };

    const handleEntryClick = async () => {
        try {
            const response = await axios.post('http://localhost/Garden_v0.0005/php/entryShop.php', { shop_id: selectedShop }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (response.data.status === 'success') {
                alert('Successfully entered the shop.');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error entering shop:', error);
        }
    };

    const handleExitClick = async () => {
        try {
            const response = await axios.post('http://localhost/Garden_v0.0005/php/exitShop.php', {}, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (response.data.status === 'success') {
                alert('Successfully exited the shop.');
                setShopName('');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error exiting shop:', error);
        }
    };

    return (
        <div className={styles.topContainer}>
            <div className={styles.selectShop}>
                <p>Shop：</p>
                <select className={styles.shops} value={selectedShop} onChange={handleShopChange}>
                    {shops.map((shop) => (
                        <option key={shop.id} value={shop.id}>{shop.shop_name}</option>
                    ))}
                </select>
            </div>
            <div className={styles.buttons}>
                <button className={styles.entryButton} onClick={handleEntryClick}>Entry</button>
                <button className={styles.exitButton} onClick={handleExitClick}>Exit</button>
            </div>
        </div>
    );
};

export default EntryButton;
