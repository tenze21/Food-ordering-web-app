// This file is used to import data into the database
// npm run data:import to import data
// npm run data:destroy to destroy data

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const food = require('./Database/foods');
const drinks = require('./Database/drinks');
const Order = require('./models/order.model');
const Food = require('./models/food.model');
const Drinks = require('./models/drink.model');

dotenv.config();
const connectDB= async ()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(error){
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}
connectDB();

const importData= async()=>{
    try {
        await Order.deleteMany();
        await Food.deleteMany();
        await Drinks.deleteMany();

        const createdFoods= await Food.insertMany(food);
        const createdDrinks= await Drinks.insertMany(drinks);

        console.log('Data Imported'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData= async()=>{
    try {
        await Order.deleteMany();
        await Food.deleteMany();
        await Drinks.deleteMany();

        console.log('Data Destroyed'.red.inverse);
        process.exit();

    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if(process.argv[2]=='-d'){
    destroyData();
}else{
    importData();
}
