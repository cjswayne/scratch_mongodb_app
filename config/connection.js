/** Setup the Mongoose connection **/
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/first_day_db');

module.exports = mongoose.connection;