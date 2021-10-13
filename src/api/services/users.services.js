const FunctionalErrorException = require('../utilities/exceptions/functional-error-exception');
const { 
    ERROR_MSG_USER_ALREADY_EXISTS, 
    ERROR_MSG_INVALID_LOGIN, 
} = require('../utilities/constants/message-constants');

const User = require('../models/user.models');

const tokenService = require('./token.services');

const create = async ({ name, email, password }, role) => {
    const alreadyExistingUser = await User.findOne({ email });
    if (alreadyExistingUser) {
        throw new FunctionalErrorException(ERROR_MSG_USER_ALREADY_EXISTS);
    }

    const newUser = await User.create({ name, email, password, role });
    
    return {
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
    };
};

const authenticate = async ({ email, password }) => {
    const user = await User.findOne({ email, password });
    if (!user) {
        throw new FunctionalErrorException(ERROR_MSG_INVALID_LOGIN);
    }

    return tokenService.generate(user);
};

module.exports = { 
    create, 
    authenticate,
};