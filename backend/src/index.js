const express = require('express'); //importar express
const routes = require('./routes');
const cors = require('cors');

//criar a aplicação
const app = express(); 

app.use(cors());
app.use(express.json()); //transformar o json do corpo da requisição em um objeto do js
app.use(routes);

//rodar aplicação
app.listen(3333);

