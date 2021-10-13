const app = require('../api/server');

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const mongoDbUrl = 'mongodb://localhost:27017/Cookmaster';
const url = 'http://localhost:3000';
var requester = chai.request.agent(url);

const { MongoClient } = require('mongodb');

const recipesStub = require('./stubs/recipes.stubs');
const userStub = require('./stubs/users.stubs');

const { 
    ERROR_MSG_RECIPE_NOT_FOUND,
} = require('../api/utilities/constants/message-constants');

const { UPLOAD_DIRECTORY } = require('../api/config/constants/settings')

describe('3 - Recipes', () => {
    let connection;
    let db;
    let recipeInfo;
    let listOfRecipes;

    before(async () => {
        connection = await MongoClient.connect(mongoDbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = connection.db('Cookmaster');
    });

    beforeEach(async () => {
        await db.collection('recipes').deleteMany({});
    });

    after(async () => {
        await connection.close();
    });

    describe('GET /recipes', () => {
        const route = '/recipes';

        beforeEach(() => {
            listOfRecipes = recipesStub.getListOfRecipes();
        });          

        it('should be possible to list recipes.', (done) => {
            db.collection('recipes').insertMany(listOfRecipes);

            requester
                .get(route)
                .end((err, res) => {
                    res.should.have.status(200);  
                    res.body.should.have.lengthOf(listOfRecipes.length);
                    done();
                });
        });
    });

    describe('GET /recipes/:id', () => {
        const route = '/recipes/:id';

        beforeEach(() => {
            recipeInfo = recipesStub.getRecipe();
        }); 

        it('should not be possible to get an unexisting recipe.', (done) => {
            const recipeId = recipeInfo._id.toString();

            requester
                .get(route.replace(':id', recipeId))
                .end((err, res) => {
                    res.should.have.status(ERROR_MSG_RECIPE_NOT_FOUND.httpStatus);  
                    res.body.should.have.property('message').equal(ERROR_MSG_RECIPE_NOT_FOUND.message);
                    done();
                });
        });

        it('should not be possible to get a recipe passing an invalid recipe id.', (done) => {
            const recipeId = '123456';

            requester
                .get(route.replace(':id', recipeId))
                .end((err, res) => {
                    res.should.have.status(ERROR_MSG_RECIPE_NOT_FOUND.httpStatus);  
                    res.body.should.have.property('message').equal(ERROR_MSG_RECIPE_NOT_FOUND.message);
                    done();
                });
        });

        it('should be possible to get a specific recipe.', (done) => {
            db.collection('recipes').insertOne(recipeInfo);
            
            requester
                .get(route.replace(':id', recipeInfo._id.toString()))
                .end((err, res) => {
                    res.should.have.status(200);  
                    res.body.should.have.property('_id').equal(recipeInfo._id.toString());
                    done();
                });
        });
    });

    describe('POST /recipes', () => {
        const route = '/recipes';

        beforeEach(() => {
            recipeInfo = recipesStub.getRecipe();
        }); 

        it('should be possible to insert a new recipe.', (done) => {
            requester
                .post(route)
                .set({ 'Authorization': userStub.getAdminUserToken() })
                .send(recipeInfo)
                .end((err, res) => {
                    res.should.have.status(201);  
                    res.body.should.have.property('recipe').that.has.property('name').equal(recipeInfo.name);
                    res.body.should.have.property('recipe').that.has.property('ingredients').equal(recipeInfo.ingredients);
                    res.body.should.have.property('recipe').that.has.property('preparation').equal(recipeInfo.preparation);
                    done();
                });
        });
    });

    describe('PUT /recipes/:id', () => {
        const route = '/recipes/:id';

        beforeEach(() => {
            recipeInfo = recipesStub.getRecipe();
        }); 

        it('should be possible to update a recipe.', (done) => {
            const userId = userStub.getNormalUser()._id;
            recipeInfo.userId = userId;
            db.collection('recipes').insertOne(recipeInfo);

            newRecipeData = recipesStub.getRecipe();
            newRecipeData.name = 'new-recipe-name';
            newRecipeData.ingredients = 'new-recipe-ingredients';
            newRecipeData.preparation = 'new-recipe-preparation';

            requester
                .put(route.replace(':id', recipeInfo._id))
                .set({ 'Authorization': userStub.getNormalUserToken() })
                .send(newRecipeData)
                .end((err, res) => {
                    res.should.have.status(200);  
                    res.body.should.have.property('name').equal(newRecipeData.name);
                    res.body.should.have.property('ingredients').equal(newRecipeData.ingredients);
                    res.body.should.have.property('preparation').equal(newRecipeData.preparation);
                    done();
                });
        });
    });

    describe('DELETE /recipes/:id', () => {
        const route = '/recipes/:id';

        beforeEach(() => {
            recipeInfo = recipesStub.getRecipe();
        }); 

        it('should be possible to delete a recipe.', (done) => {
            const userId = userStub.getNormalUser()._id;
            recipeInfo.userId = userId;
            db.collection('recipes').insertOne(recipeInfo);

            requester
                .delete(route.replace(':id', recipeInfo._id))
                .set({ 'Authorization': userStub.getNormalUserToken() })
                .send(newRecipeData)
                .end((err, res) => {
                    res.should.have.status(204);  
                    done();
                });
        });
    });

    describe('PUT /recipes/:id/image', () => {
        const route = '/recipes/:id/image';

        beforeEach(() => {
            recipeInfo = recipesStub.getRecipe();
        }); 

        it('should be possible to update a recipe image.', (done) => {
            const userId = userStub.getNormalUser()._id;
            recipeInfo.userId = userId;
            db.collection('recipes').insertOne(recipeInfo);

            requester
                .put(route.replace(':id', recipeInfo._id))
                .set({ 'Authorization': userStub.getNormalUserToken(), 'content-type': 'multipart/form-data' })
                .attach('image', `${__dirname}/../uploads/ratinho.jpg`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('_id').equal(recipeInfo._id.toString());
                    res.body.should.have.property('name').equal(recipeInfo.name);
                    res.body.should.have.property('ingredients').equal(recipeInfo.ingredients);
                    res.body.should.have.property('preparation').equal(recipeInfo.preparation);
                    res.body.should.have.property('image').equal(`${url.replace('http://', '')}/${UPLOAD_DIRECTORY}/${recipeInfo._id.toString()}.jpeg`);
                    done();
                });
        });
    });

    describe('GET /image/:id', () => {
        const route = '/images/:id';

        beforeEach(() => {
            recipeInfo = recipesStub.getRecipe();
        }); 

        it('should be possible to get a recipe image.', (done) => {
            requester
                .get(route.replace(':id', 'ratinho.jpg'))
                .set({ 'Authorization': userStub.getNormalUserToken() })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});