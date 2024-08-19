import React, { useState } from 'react';
import '../styles/Body.css';
import CardForm from './CardForm';
import AccountForm from './AccountForm'; // Import AccountForm

const Body = () => {
    const [showForm, setShowForm] = useState(false);  // State to toggle the form
    const [formType, setFormType] = useState(''); // State to determine which form to show
    const [searchInput, setSearchInput] = useState(''); // State to store the search input

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchInput(value);

        // Check if the input matches any card title
        if (value === 'Branches' || value === 'Manage your account') {
            setFormType(value); // Set the form type based on the input
            setShowForm(true); // Show the form
        } else {
            setShowForm(false); // Hide the form if input doesn't match
        }
    };

    const handleCardClick = (cardTitle) => {
        console.log(`Card clicked: ${cardTitle}`);  // Log which card was clicked
        setSearchInput(cardTitle); // Set search input to the clicked card title
        if (cardTitle === 'Branches' || cardTitle === 'Manage your account') {
            console.log(`${cardTitle} card was clicked`); // Log specific card click
            setFormType(cardTitle); // Set the form type based on the clicked card
            setShowForm(true); // Show the form
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


