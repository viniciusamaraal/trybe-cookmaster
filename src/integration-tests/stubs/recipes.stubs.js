const mongoose = require('mongoose');

const getRecipe = (userId) => {
    return {
        _id:  new mongoose.Types.ObjectId,
        name: 'frango com quiabo',
        ingredients: 'frango, quiabo e tomate',
        preparation: 'cozinhe por 10 minutos.',
        userId: userId ? userId : new mongoose.Types.ObjectId,
    };
};

const getListOfRecipes = (userId) => {
    return [
        {
            _id: new mongoose.Types.ObjectId,
            name: 'frango com quiabo',
            ingredients: 'frango, quiabo e tomate',
            preparation: 'cozinhe por 10 minutos.',
            userId: userId ? userId : new mongoose.Types.ObjectId,
        },
        {
            _id: new mongoose.Types.ObjectId,
            name: 'bife com batata',
            ingredients: 'bife, batata',
            preparation: 'frite por 20 minutos.',
            userId: userId ? userId : new mongoose.Types.ObjectId,
        },
        {
            _id: new mongoose.Types.ObjectId,
            name: 'bolo de cenoura',
            ingredients: 'cenoura, ovos, leite e fermento',
            preparation: 'asse por 35 minutos.',
            userId: userId ? userId : new mongoose.Types.ObjectId,
        },
    ];  
};

module.exports = {
    getRecipe,
    getListOfRecipes,
};