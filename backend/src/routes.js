const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router(); //colocar o modulo de rotas do express na variavel em questão

// rota para listar todas as ongs
routes.get('/ongs', OngController.index);

// rota para criar ong
routes.post('/ongs', OngController.create);

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);

// login
routes.post('/sessions', SessionController.create);

module.exports = routes //exportar variavel

