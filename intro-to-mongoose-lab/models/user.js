const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    }
});




const Customer = mongoose.model('Customer', {
    name: String,
    age: Number
});
