const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

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
        validate: validator.isEmail,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
    },
    address: {
        type: String,
        required : true,
    },
    designation: {
        type: String,
        required : true,
    },
    password: {
        type: String,
        required : true,
        minlength: 8,
        //password wont be included when we get the users
        select: false,
    },
})
userSchema.pre('save', async function (next) {
    //Only run this function if password was actually modified
    if (!this.isModified('password')) return next()
    //Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12)
    //Delete passwordConfirm field
    next()
})

// userSchema.pre('findOneAndUpdate',async function(next) {
//     const update = this.getUpdate();
//     if (update.password !==""&&
//         update.password !== undefined &&
//         update.password == update.passwordConfirm ){
//         //Hash the password with cost of 12
//         this.getUpdate().password = await bcrypt.hash(update.password, 12)
//          // // Delete passwordConfirm field
//         update.passwordConfirm = undefined
//         next()
//        }else
//        next()
// })

const User = mongoose.model('User', userSchema)
module.exports = User
