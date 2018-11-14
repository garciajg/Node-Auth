//Get an instance of mongoose database
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Set up a mongoose schema
module.exports = mongoose.model('User', new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    admin: Boolean
}));