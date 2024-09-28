const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({

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
        required: true ,
    },

    images: {
        type: String,
        default: 'default.jpg'
    },

    isAvailable: {
        type: Boolean,
        default: true,
    },

    category: {
        type: String,
        enum: ['veg', 'nonveg'],
        required: [true, 'Please specify if it is veg or non-veg']
    }

});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;