const express = require('express');
const router = express.Router();
const Card = require('../models/Card'); 

// Create a new card
router.post('/cards', async (req, res) => {
    const { title, description } = req.body;
    try {
        const newCard = new Card({ title, description });
        await newCard.save();
        res.status(201).json(newCard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Retrieve all cards
router.get('/cards', async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Retrieve a specific card by title
router.get('/cards/:title', async (req, res) => {
    try {
        const card = await Card.findOne({ title: req.params.title });
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
