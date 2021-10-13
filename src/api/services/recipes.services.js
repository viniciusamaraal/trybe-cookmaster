const FunctionalErrorException = require('../utilities/exceptions/functional-error-exception');
const { 
    ERROR_MSG_RECIPE_NOT_FOUND, 
    ERROR_MSG_INCORRECT_TOKEN, 
    ERROR_MSG_RECIPE_ALREADY_EXISTS,
} = require('../utilities/constants/message-constants');

const { ROLES } = require('../config/constants/settings');

const Recipe = require('../models/recipe.models');

const get = async (_id) => {
    const recipe = await Recipe.findOne({ _id });
    if (recipe) {
        return recipe;
    }

    throw new FunctionalErrorException(ERROR_MSG_RECIPE_NOT_FOUND);
};

const list = async () => Recipe.find();

const insert = async ({ name, ingredients, preparation }, userId) => {
    const recipe = await Recipe.findOne({ name });
    if (recipe) {
        throw new FunctionalErrorException(ERROR_MSG_RECIPE_ALREADY_EXISTS);
    }
    
    const newRecipe = await Recipe.create({ name, ingredients, preparation, userId });
    
    return {
        _id: newRecipe.id,
        name: newRecipe.name,
        ingredients: newRecipe.ingredients,
        preparation: newRecipe.preparation,
        userId: newRecipe.userId,
    };
};

const runCommonValidations = async (recipeId, userId, userRole) => {
    const recipe = await Recipe.findOne({ _id: recipeId });
    if (!recipe) {
        throw new FunctionalErrorException(ERROR_MSG_RECIPE_NOT_FOUND);
    }

    if (recipe.userId.toString() !== userId && userRole !== ROLES.ADMIN) {
        throw new FunctionalErrorException(ERROR_MSG_INCORRECT_TOKEN);
    }
};

const update = async (recipeId, { name, ingredients, preparation }, userId, userRole) => {
    await runCommonValidations(recipeId, userId, userRole);

    const recipeSameName = await Recipe.findOne({ _id: { $ne: recipeId }, name });
    if (recipeSameName) {
        throw new FunctionalErrorException(ERROR_MSG_RECIPE_ALREADY_EXISTS);
    }

    const updatedRecipe = await Recipe.findOneAndUpdate(
        { _id: recipeId }, { name, ingredients, preparation }, { returnOriginal: false },
    );

    return {
        _id: updatedRecipe.id,
        name: updatedRecipe.name,
        ingredients: updatedRecipe.ingredients,
        preparation: updatedRecipe.preparation,
        userId: updatedRecipe.userId,
    };
};

const erase = async (recipeId, userId, userRole) => {
    await runCommonValidations(recipeId, userId, userRole);
    await Recipe.deleteOne({ _id: recipeId });
};

const addImage = async (recipeId, userId, userRole, image) => {
    await runCommonValidations(recipeId, userId, userRole);

    const updatedRecipe = await Recipe.findOneAndUpdate(
        { _id: recipeId }, { image }, { returnOriginal: false },
    );

    return {
        _id: updatedRecipe.id,
        name: updatedRecipe.name,
        ingredients: updatedRecipe.ingredients,
        preparation: updatedRecipe.preparation,
        userId: updatedRecipe.userId,
        image: updatedRecipe.image,
    };
};

module.exports = { 
    get, 
    list,
    insert,
    update,
    erase,
    addImage,
};