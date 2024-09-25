const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const createHttpError = require('http-errors')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
    },
    contactNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required : true,
        unique: true,
        lowercase: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    address: {
        type: String,
        required : true,
    },
    designation: {
        type: String,
        enum:['Student', 'Faculty'],
        required : true,
    },
    password: {
        type: String,
        required : true,
        minlength: 8,
        select: false,
    },
})
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

userSchema.methods.isValidPassword = async function(candidatePassword, userPassword) {
    try {
        return await bcrypt.compare(candidatePassword, userPassword);
    } catch (error) {
        throw createHttpError.InternalServerError(error.message)
    }
};

const User = mongoose.model('User', userSchema)
module.exports = User
