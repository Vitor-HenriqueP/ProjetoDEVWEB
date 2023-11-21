const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const firebase = require('firebase'); // Configure com suas credenciais

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'secretpassword', resave: true, saveUninitialized: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    const response = await axios.get(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro na pesquisa.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
