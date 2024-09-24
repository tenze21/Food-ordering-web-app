const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required : [true, 'Please tell us your name!'],
    },
    email: {
        type: String,
        required : [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: [true, 'Please specify your gender'],
    },
    address: {
        type: String,
        required : [true, 'Please provide your address'],
    },
    designation: {
        type: String,
        required : [true, 'Please provide your designation'],
    },
    password: {
        type: String,
        required : [true, 'Please provide a password'],
        minlength: 8,
        //password wont be included when we get the users
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            //this only works on SAVE!!!
            validator: function (el) {
                return el === this.password
            },
            message: 'Passwords are not the same',
        },
    },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
})
userSchema.pre('save', async function (next) {
    //Only run this function if password was actually modified
    if (!this.isModified('password')) return next()
    //Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12)
    //Delete passwordConfirm field
    this.passwordConfirm = undefined
    next()
})

userSchema.pre('findOneAndUpdate',async function(next) {
    const update = this.getUpdate();
    if (update.password !==""&&
        update.password !== undefined &&
        update.password == update.passwordConfirm ){
        //Hash the password with cost of 12
        this.getUpdate().password = await bcrypt.hash(update.password, 12)
         // // Delete passwordConfirm field
        update.passwordConfirm = undefined
        next()
       }else
       next()
})

const User = mongoose.model('User', userSchema)
module.exports = User
