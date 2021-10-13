const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const { ERROR_MSG_INVALID_ENTRIES } = require('../utilities/constants/message-constants');

const validationHandler = require('../middlewares/validation-handler');
const { 
    authenticationHandler, 
    isAdminAuthenticationHandler, 
} = require('../middlewares/authentication-handler');

const resource = require('../controllers/users.controllers');

router.post(
    '',  
    validationHandler.validate(
        [
            body('name').exists().withMessage(ERROR_MSG_INVALID_ENTRIES), 
            body('email')
                .exists()
                .withMessage(ERROR_MSG_INVALID_ENTRIES)
                .bail()
                .isEmail()
                .withMessage(ERROR_MSG_INVALID_ENTRIES), 
            body('password').exists().withMessage(ERROR_MSG_INVALID_ENTRIES), 
        ],
    ),
    resource.create,
);

router.post(
    '/admin',  
    authenticationHandler,
    isAdminAuthenticationHandler,
    validationHandler.validate(
        [
            body('name').exists().withMessage(ERROR_MSG_INVALID_ENTRIES), 
            body('email')
                .exists()
                .withMessage(ERROR_MSG_INVALID_ENTRIES)
                .bail()
                .isEmail()
                .withMessage(ERROR_MSG_INVALID_ENTRIES), 
            body('password').exists().withMessage(ERROR_MSG_INVALID_ENTRIES),
        ],
    ),
    resource.createAdmin,
);

module.exports = router;