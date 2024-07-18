import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import styles from './style.module.scss';

const ShopData = () => {

    const [shops, setShops] = useState([]);
    const [defaultShop, setDefaultShop] = useState('');
    const [selectedShop, setSelectedShop] = useState('');
    const [shopName, setShopName] = useState('');
    const [ageDistribution, setAgeDistribution] = useState(null);
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

    const handleShopClick = async () => {
        try {
            const response = await axios.get('http://localhost/Garden_v0.0005/php/getShopAgeDistribution.php', {
                params: { shop_id: selectedShop },
                withCredentials: true
            });
            setAgeDistribution(response.data);
        } catch (error) {
            console.error('Error fetching age distribution:', error);
        }
    };

    const ageLabels = ["10s", "20s", "30s", "40s", "50s", "60s"];
    const ageData = ageDistribution ? Object.values(ageDistribution) : [];

    const data = {
        labels: ageLabels,
        datasets: [
            {
                label: 'Age Distribution',
                data: ageData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }
        ]
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
                <button className={styles.shopSelect} onClick={handleShopClick}>Go</button>
            </div>
            {ageDistribution && (
                <div className={styles.chartContainer}>
                    <Pie data={data} />
                </div>
            )}
        </div>
    );
};

export default ShopData;
