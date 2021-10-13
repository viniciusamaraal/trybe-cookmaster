const { model, Schema } = require('mongoose');

const recipeSchema = new Schema({
        name: {
            type: String,
            unique: true,
            required: true,
            index: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            index: true,
            ref: 'users',
        },
        ingredients: {
            type: String,
            required: true,
        },
        preparation: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
    }, { 
        versionKey: false,
    });

module.exports = model('recipes', recipeSchema);