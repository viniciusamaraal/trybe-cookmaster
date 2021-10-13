const express = require('express');
require('express-async-errors'); 

const path = require('path');

const loginRoutes = require('./routes/login.routes');
const userRoutes = require('./routes/users.routes');
const recipeRoutes = require('./routes/recipes.routes');

const errorHandler = require('./middlewares/error-handler');

const app = express();

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.use('/login', loginRoutes);
app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use(errorHandler);

// Não remover esse end-point, ele é necessário para o avaliador
module.exports = app;