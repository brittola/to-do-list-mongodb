const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const listRoutes = require('./routes/listRoutes');
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/to-do-list');

let db = mongoose.connection;

db.on('open', () => { console.log('Banco carregado') });
db.once('error', () => { console.log('Erro ao carregar o banco') });

app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', listRoutes);


app.listen(PORT, () => { console.log('Server running on port: ' + PORT); });