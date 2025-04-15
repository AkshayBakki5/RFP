// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.get('/api/shoes', async (req, res) => {
    try {
        const response = await fetch('https://shoes-collections.p.rapidapi.com/shoes', {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'shoes-collections.p.rapidapi.com',
                'x-rapidapi-key': '4564b6ff18msh0fefc0e82b3159ap1c1970jsn0d1a6116bde5'
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'API fetch failed' });
    }
});

app.get('/api/shoes/:id', async (req, res) => {
    try {
        const response = await fetch(`https://shoes-collections.p.rapidapi.com/shoes/${req.params.id}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'shoes-collections.p.rapidapi.com',
                'x-rapidapi-key': '4564b6ff18msh0fefc0e82b3159ap1c1970jsn0d1a6116bde5'
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'API fetch failed' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));