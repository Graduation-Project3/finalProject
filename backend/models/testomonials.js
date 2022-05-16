const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testoSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
});

module.exports =  mongoose.model('Testo',testoSchema);