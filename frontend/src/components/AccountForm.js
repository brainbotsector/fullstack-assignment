import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Body.css';

const AccountForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [userDetails, setUserDetails] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${searchEmail}`);
      setUserDetails(response.data);
      setEmail(response.data.email);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setPhone(response.data.phone);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setUserDetails(null); // Clear user details if not found
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        email,
        firstName,
        lastName,
        phone,
        password,
      });
      console.log('User added:', response.data);
      onClose(); // Close the form after submission
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="account-form-container">
      <div className="account-form">
        <h2>{userDetails ? 'Edit User' : 'Add New User'}</h2>
        
        <div className="search-section">
          <label>Search by Email:</label>
          <input 
            type="email" 
            name="searchEmail" 
            value={searchEmail} 
            onChange={(e) => setSearchEmail(e.target.value)} 
            placeholder="Enter email to search" 
            autoComplete="email"
          />
          <button type="button" onClick={handleSearch}>Find User</button>
        </div>

        {userDetails && (
          <div className="user-details">
            <h3>User Details</h3>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>First Name:</strong> {userDetails.firstName}</p>
            <p><strong>Last Name:</strong> {userDetails.lastName}</p>
            <p><strong>Phone:</strong> {userDetails.phone}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input 
              type="email" 
              name="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              autoComplete="email" 
              disabled={userDetails}
            />
          </div>
          <div>
            <label>First Name:</label>
            <input 
              type="text" 
              name="firstName" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              required 
              autoComplete="given-name" 
              disabled={userDetails}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input 
              type="text" 
              name="lastName" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              required 
              autoComplete="family-name" 
              disabled={userDetails}
            />
          </div>
          <div>
            <label>Phone:</label>
            <input 
              type="tel" 
              name="phone" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
              autoComplete="tel" 
              disabled={userDetails}
            />
          </div>
          <div>
            <label>Password:</label>
            <input 
              type="password" 
              name="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              autoComplete="new-password" 
              disabled={userDetails}
            />
          </div>
          <button type="submit" disabled={userDetails}>Add/Update User</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;
