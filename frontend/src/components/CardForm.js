import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Body.css';

const CardForm = ({ cardTitle, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [allCards, setAllCards] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchedCard, setSearchedCard] = useState(null);
  const [alert, setAlert] = useState('');

  useEffect(() => {
    if (cardTitle) {
      setTitle(cardTitle);
    }
  }, [cardTitle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend to add the new card
      const response = await axios.post('http://localhost:5000/api/cards', {
        title,
        description,
      });
      console.log('Card added:', response.data);
      onClose(); // Close the form after submission
    } catch (error) {
      console.error('Error adding card:', error);
    }
    onClose();
  };

  const fetchAllCards = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cards');
      setAllCards(response.data);
      setAlert('');
    } catch (error) {
      console.error('Error fetching all cards:', error);
      setAlert('There was an error fetching the cards. Please try again.');
    }
  };

  const fetchCardByTitle = async () => {
    if (!searchTitle) {
      setAlert('Please enter a title to search.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/cards/${searchTitle}`);
      setSearchedCard(response.data);
      setAlert('');
    } catch (error) {
      console.error('Error fetching card by title:', error);
      setSearchedCard(null);
      setAlert(`No card found with the title "${searchTitle}".`);
    }
  };




  return (
    <div className="card-form-container">
    <div className="card-form">
      <h2>Add New Card</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            readOnly={!!cardTitle} // Prevent editing if the title is predefined
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Add Card</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>

      <div>
        <button onClick={fetchAllCards}>Show All Cards</button>
        {allCards.length > 0 && (
          <table className="cards-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {allCards.map(card => (
                <tr key={card._id}>
                  <td>{card.title}</td>
                  <td>{card.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div>
        <h2>Search Card by Title</h2>
        <input
          type="text"
          placeholder="Enter card title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        {alert && <div className="alert">{alert}</div>}
        <button onClick={fetchCardByTitle}>Search</button>

        {searchedCard && (
          <div>
            <h3>{searchedCard.title}</h3>
            <p>{searchedCard.description}</p>
          </div>
        )}

        {searchedCard === null && searchTitle && (
          <p>No card found with the title "{searchTitle}".</p>
        )}
      </div>

    </div>
    </div>
  );
};

export default CardForm;



