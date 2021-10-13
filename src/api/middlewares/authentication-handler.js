const FunctionalErrorException = require('../utilities/exceptions/functional-error-exception');
const { ERROR_MSG_ONLY_ADMINS_ACTION } = require('../utilities/constants/message-constants');

const tokenService = require('../services/token.services');

const { ROLES } = require('../config/constants/settings');

const authenticationHandler = (req, res, next) => {
    const userToken = tokenService.validate(req.headers.authorization);
    req.user = userToken;

    next();
};

const isAdminAuthenticationHandler = (req, res, next) => {
    if (req.user.role !== ROLES.ADMIN) {
        throw new FunctionalErrorException(ERROR_MSG_ONLY_ADMINS_ACTION);
    }

    next();
};

module.exports = { 
    authenticationHandler,
    isAdminAuthenticationHandler,
};