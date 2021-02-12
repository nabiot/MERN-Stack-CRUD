const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Membership = new Schema({
    Full_Name: {
        type: String,
    },
    Email: {
        type: String,
    },
    Address: {
        type: String,
    },
    Phone_Number: {
        type: Number,
    },
})

module.exports = mongoose.model('Membership', Membership);