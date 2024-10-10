const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderItems: [{
        food: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food",
            required: false
        },
        drinks: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Drinks",
            required: false
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
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
        enum: ["Pending", "Preparing", "Ready", "Delivered"],
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