const recipesService = require('../services/recipes.services');

const list = async (req, res) => {
    const result = await recipesService.list();
    
    return res.status(200).json(result);
};

const get = async (req, res) => {
    const result = await recipesService.get(req.params.id);
    
    return res.status(200).json(result);
};

const insert = async (req, res) => {
    const result = await recipesService.insert(req.body, req.user.id);

    return res.status(201).json({ recipe: result });
};

const update = async (req, res) => {
    const result = await recipesService.update(req.params.id, req.body, req.user.id, req.user.role);
    
    return res.status(200).json(result);
};

const erase = async (req, res) => {
    await recipesService.erase(req.params.id, req.user.id, req.user.role);
    
    return res.status(204).send();
};

const addImage = async (req, res) => {
    const fileName = `${req.get('host')}/${req.file.path.replace(/\\/g, '/')}`;
    const result = await recipesService
        .addImage(req.params.id, req.user.id, req.user.role, fileName, req.file);

    return res.status(200).json(result);
};

module.exports = { 
    list,
    get,
    insert,
    update,
    erase,
    addImage,
};