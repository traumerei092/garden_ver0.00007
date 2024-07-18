import { useState } from 'react';

const useLoginTab = () => {
    const [activeTab, setActiveTab] = useState('login');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return {
        activeTab,
        handleTabClick
    };
};

export default useLoginTab;