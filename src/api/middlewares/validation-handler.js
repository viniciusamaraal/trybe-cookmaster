const { validationResult } = require('express-validator');
const { ERROR_MSG_GENERIC } = require('../utilities/constants/message-constants');

const validate = (validations) => async (req, res, next) => {
    const promises = [];
    validations.map((v) => promises.push(v.run(req)));
    await Promise.all(promises);
  
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
  
    const finalError = errors.array().length > 0 ? errors.array()[0] : ERROR_MSG_GENERIC;
    res.status(finalError.msg.httpStatus).json({ message: finalError.msg.message });
};

module.exports = {
    validate,
};