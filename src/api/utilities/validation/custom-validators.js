const mongoose = require('mongoose');
const { param } = require('express-validator');

const { ERROR_MSG_RECIPE_NOT_FOUND } = require('../constants/message-constants');

const idValidator = param('id').custom((value) => 
    mongoose.Types.ObjectId.isValid(value)).withMessage(ERROR_MSG_RECIPE_NOT_FOUND);

module.exports = {
    idValidator,
};