const express = require('express');

const multer = require('multer');
const { body } = require('express-validator');
const storage = require('../services/storage.services');

const validationHandler = require('../middlewares/validation-handler');
const { authenticationHandler } = require('../middlewares/authentication-handler');

const upload = multer(storage);
const router = express.Router();

const { 
    ERROR_MSG_INVALID_ENTRIES,
} = require('../utilities/constants/message-constants');

const customValidators = require('../utilities/validation/custom-validators');

const resource = require('../controllers/recipes.controllers');

router.get(
    '/:id',
    validationHandler.validate([customValidators.idValidator]),
    resource.get,
);

router.get(
    '',
    resource.list,
);

router.post(
    '',  
    authenticationHandler,
    validationHandler.validate(
        [
            body('name').exists().withMessage(ERROR_MSG_INVALID_ENTRIES), 
            body('ingredients').exists().withMessage(ERROR_MSG_INVALID_ENTRIES), 
            body('preparation').exists().withMessage(ERROR_MSG_INVALID_ENTRIES),
        ],
    ),
    resource.insert,
);

router.put(
    '/:id',  
    authenticationHandler,
    validationHandler.validate(
        [
            customValidators.idValidator,
            body('name').exists().withMessage(ERROR_MSG_INVALID_ENTRIES), 
            body('ingredients').exists().withMessage(ERROR_MSG_INVALID_ENTRIES), 
            body('preparation').exists().withMessage(ERROR_MSG_INVALID_ENTRIES),
        ],
    ),
    resource.update,
);

router.delete(
    '/:id',  
    authenticationHandler,
    validationHandler.validate([customValidators.idValidator]),
    resource.erase,
);

router.put(
    '/:id/image',  
    authenticationHandler,
    validationHandler.validate([customValidators.idValidator]),
    upload.single('image'),
    resource.addImage,
);

module.exports = router;
