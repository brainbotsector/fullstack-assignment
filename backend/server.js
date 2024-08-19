const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const cardRoutes = require('./routes/cardroutes');
const userRoutes = require('./routes/user');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000' 
}));

app.use(bodyParser.json());
app.use('/api', cardRoutes);
app.use('/api', userRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/helpcenter')
    .then(() => {
        console.log('Connected to MongoDB successfully');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });

const port = 5000;

app.get('/ping', (req, res) => {
    res.send('Server is running');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
