const express = require('express');
const router = express.Router();
const User = require('../models/User');

const bcrypt = require('bcrypt');

router.post('/users', async (req, res) => {
    const { email, firstName, lastName, phone, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            // Update user if exists
            user.firstName = firstName;
            user.lastName = lastName;
            user.phone = phone;
            if (password) {
                user.password = await bcrypt.hash(password, 10);
            }
            await user.save();
            return res.status(200).json(user);
        } else {
            // Create a new user if not exists
            user = new User({
                email,
                firstName,
                lastName,
                phone,
                password: await bcrypt.hash(password, 10),
            });
            await user.save();
            res.status(201).json(user);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Retrieve user profile by email
router.get('/users/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
