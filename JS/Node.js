// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const fetch = require('node-fetch');

app.get('/api/shoes', async (req, res) => {
    try {
        const response = await fetch('https://shoes-collections.p.rapidapi.com/shoes', {
            headers: {
                'x-rapidapi-host': 'shoes-collections.p.rapidapi.com',
                'x-rapidapi-key': process.env.RAPIDAPI_KEY
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.listen(3000);