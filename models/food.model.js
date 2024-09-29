const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true ,
    },

    description: {
        type: String,
        required: true,
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
    },

    category: {
        type: String,
        enum: ['veg', 'nonveg'],
        required: true
    }

});

const Food = mongoose.model('Food', foodSchema);
module.exports = Food;