process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const IS_DEV = process.env.NODE_ENV === 'development';

const TOKEN = {
    SECRET: '43f1c6b347ab41cd8e90be242fdbfb92',
    EXPIRES_IN: 3600,
};

const ROLES = {
    USER: 'user',
    ADMIN: 'admin',
};

const MONGO_DB_SERVER = IS_DEV ? 'localhost' : 'mongodb';
const MONGO_DB_URL = `mongodb://${MONGO_DB_SERVER}:27017/Cookmaster`;

const UPLOAD_DIRECTORY = 'src/uploads';

module.exports = {
    TOKEN,
    ROLES,
    MONGO_DB_URL,
    UPLOAD_DIRECTORY,
};