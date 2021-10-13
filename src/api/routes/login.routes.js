const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const { 
    ERROR_MSG_LOGIN_EMPTY_FIELDS, 
    ERROR_MSG_INVALID_LOGIN, 
} = require('../utilities/constants/message-constants');
const validationHandler = require('../middlewares/validation-handler');

const resource = require('../controllers/login.controllers');

router.post(
    '', 
    validationHandler.validate(
        [
            body('email')
                .exists()
                .withMessage(ERROR_MSG_LOGIN_EMPTY_FIELDS)
                .bail()
                .isEmail()
                .withMessage(ERROR_MSG_INVALID_LOGIN), 
            body('password').exists().withMessage(ERROR_MSG_LOGIN_EMPTY_FIELDS),
        ],
    ),
    resource.authenticate,
);

module.exports = router;