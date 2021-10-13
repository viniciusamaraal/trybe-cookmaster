const FunctionalErrorException = require('../utilities/exceptions/functional-error-exception');
const { ERROR_MSG_GENERIC } = require('../utilities/constants/message-constants');

const errorHandler = (err, req, res, _) => {
    if (err instanceof FunctionalErrorException) {
        return res.status(err.httpStatus).json({ message: err.message });
    }

    return res.status(ERROR_MSG_GENERIC.httpStatus).json({ message: ERROR_MSG_GENERIC.message });
};

module.exports = errorHandler;