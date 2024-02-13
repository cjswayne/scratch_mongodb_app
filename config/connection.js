/** Setup the Mongoose connection **/
const mongoose = require('mongoose');
// require('dotenv').config(); 
const DB_URL = process.env.DB_URL;
console.log('Connecting to DB with URL:', process.env.DB_URL);




mongoose.connect(DB_URL);

module.exports = mongoose.connection;