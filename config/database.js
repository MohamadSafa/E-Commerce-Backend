const mongoose = require('mongoose');
require('dotenv').config();
const mongoURL = process.env.MONGO_URL;

async function checkConnection() {
    try {
      await mongoose.connect(mongoURL);
      console.log('connected to database successfully');
    } catch (error) {
      console.log("failed to connect",error);
    }
   }

module.exports = {checkConnection}; // we put inside the curly brackets because its a function