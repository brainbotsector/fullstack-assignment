import React, { useState } from 'react';
import '../styles/Body.css';
import CardForm from './CardForm';
import AccountForm from './AccountForm'; 
const Body = () => {
    const [showForm, setShowForm] = useState(false); 
    const [formType, setFormType] = useState(''); 
    const [searchInput, setSearchInput] = useState(''); 

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchInput(value);


        if (value === 'Branches' || value === 'Manage your account') {
            setFormType(value); 
            setShowForm(true); 
        } else {
            setShowForm(false); 
        }
    };

    const handleCardClick = (cardTitle) => {
        console.log(`Card clicked: ${cardTitle}`);  
        setSearchInput(cardTitle); 
        if (cardTitle === 'Branches' || cardTitle === 'Manage your account') {
            console.log(`${cardTitle} card was clicked`); 
            setFormType(cardTitle); 
            setShowForm(true); 
        }
    };

    const handleCloseForm = () => {
        setShowForm(false); 
        setSearchInput(''); 
    };

    return (
        <div className='body-container'>
            <div className='search-container'>
                <h1>How can we help?</h1>
                <input
                    type='text'
                    placeholder='Search'
                    className='search-input'
                    value={searchInput}
                    onChange={handleSearch} 
                />
            </div>

            { /* Card Grid */ }
            <div className='card-grid'>
                <div className='card' onClick={() => handleCardClick('Branches')}>
                    <h2>Branches</h2>
                    <p>Abstract Branches lets you manage, version, and document your designs in one place.</p>
                </div>
                <div className='card' onClick={() => handleCardClick('Manage your account')}>
                    <h2>Manage your account</h2>
                    <p>Configure your account settings, such as your email, profile details, and password.</p>
                </div>
                <div className='card'>
                    <h2>Manage organizations, teams, and projects</h2>
                    <p>Use Abstract organizations, teams, and projects to organize your people and your work.</p>
                </div>
                <div className='card'>
                    <h2>Manage billing</h2>
                    <p>Change subscriptions and payment details.</p>
                </div>
                <div className='card'>
                    <h2>Authenticate to Abstract</h2>
                    <p>Set up and configure SSO, SCIM, and Just-in-Time provisioning.</p>
                </div>
                <div className='card'>
                    <h2>Abstract support</h2>
                    <p>Get in touch with a human.</p>
                </div>
            </div>

            {showForm && formType === 'Manage your account' && (
                <AccountForm onClose={handleCloseForm} />
            )}
            {showForm && formType === 'Branches' && (
                <CardForm onClose={handleCloseForm} />
            )}
        </div>
    );
}

export default Body;


