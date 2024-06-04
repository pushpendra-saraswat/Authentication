const mongoose = require('mongoose');
require('dotenv').config();
const url =process.env.Mongo_Url;

const connectDB = async () => {
  try {
   
    await mongoose.connect( url);
   
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
