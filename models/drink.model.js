const mongoose = require('mongoose')

const drinkSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true ,
    },

    description: {
        type: String,
        required: true ,
    },

    price: {
        type: Number,
        required: true,
        default: 0
    },

    images: {
        type: String,
        required: true,
        default: 'default.jpg'
    },

    isAvailable: {
        type: Boolean,
        default: true,
    }

});

const Drink = mongoose.model('Drink', drinkSchema);
module.exports = Drink;