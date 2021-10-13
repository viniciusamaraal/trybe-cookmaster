const ERROR_MSG_GENERIC = {
    httpStatus: 500,
    message: 'An unexpected error has ocurred',
};

// General
const ERROR_MSG_INVALID_ENTRIES = {
    httpStatus: 400,
    message: 'Invalid entries. Try again.',
};

// Login - Generate token
const ERROR_MSG_LOGIN_EMPTY_FIELDS = {
    httpStatus: 401,
    message: 'All fields must be filled',
};

const ERROR_MSG_INVALID_LOGIN = {
    httpStatus: 401,
    message: 'Incorrect username or password',
};

// Login - Validate Token
const ERROR_MSG_LOGIN_MISSING_TOKEN = {
    httpStatus: 401,
    message: 'missing auth token',
};

const ERROR_MSG_INCORRECT_TOKEN = {
    httpStatus: 401,
    message: 'jwt malformed',
};

// User
const ERROR_MSG_USER_ALREADY_EXISTS = {
    httpStatus: 409,
    message: 'Email already registered',
};

const ERROR_MSG_ONLY_ADMINS_ACTION = {
    httpStatus: 403,
    message: 'Only admins can register new admins',
};

// Recipe
const ERROR_MSG_RECIPE_NOT_FOUND = {
    httpStatus: 404,
    message: 'recipe not found',
};

const ERROR_MSG_RECIPE_ALREADY_EXISTS = {
    httpStatus: 400,
    message: 'recipe already registered',
};

module.exports = {
    ERROR_MSG_GENERIC,

    // General
    ERROR_MSG_INVALID_ENTRIES,

    // Login - Generate token
    ERROR_MSG_LOGIN_EMPTY_FIELDS,
    ERROR_MSG_INVALID_LOGIN,

    // Login - Validate Token
    ERROR_MSG_LOGIN_MISSING_TOKEN,
    ERROR_MSG_INCORRECT_TOKEN,
    
    // User
    ERROR_MSG_USER_ALREADY_EXISTS,
    ERROR_MSG_ONLY_ADMINS_ACTION,

    // Recipe
    ERROR_MSG_RECIPE_ALREADY_EXISTS,
    ERROR_MSG_RECIPE_NOT_FOUND,
};