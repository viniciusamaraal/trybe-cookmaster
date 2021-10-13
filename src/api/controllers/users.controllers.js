const usersService = require('../services/users.services');

const { ROLES } = require('../config/constants/settings');

const create = async (req, res) => {
    const creationResult = await usersService.create(req.body, ROLES.USER);

    return res.status(201).json({ user: creationResult });
};

const createAdmin = async (req, res) => {
    const creationResult = await usersService.create(req.body, ROLES.ADMIN);

    return res.status(201).json({ user: creationResult });
};

module.exports = { 
    create,
    createAdmin,
};