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
    },

    isAvailable: {
        type: Boolean,
        default: true,
    }

},{
    timestamps: true
});

const Drinks = mongoose.model('Drinks', drinkSchema);
module.exports = Drinks;