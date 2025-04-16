// Node.js proxy example
const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/api/shoes', async (req, res) => {
    const response = await fetch('https://shoes-collections.p.rapidapi.com/shoes', {
        headers: {
            'x-rapidapi-host': 'shoes-collections.p.rapidapi.com',
            'x-rapidapi-key': process.env.API_KEY
        }
    });
    res.json(await response.json());
});

app.listen(3000);