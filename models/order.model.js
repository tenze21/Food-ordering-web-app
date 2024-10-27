const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderItems: [{
        itemFood: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food",
            required: false
        },
        itemDrink: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Drink",
            required: false
        },
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true
        },
        specialInstructions: {
            type: String,
            required: false
        }
    }],
    journalNumber: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    orderStatus: {
        type: String,
        required: true,
        enum: ["Pending", "Ready", "Delivered"],
        default: "Pending"
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
},{
    timestamps: true
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;