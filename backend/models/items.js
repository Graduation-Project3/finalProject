 const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:[String],
        required:true
    },
    minPrice:{
       type:Number,
       required:true 
    },
    maxPrice:{
        type:Number,
        required:true 
     },
     category:{
        type:String,
    },
    prices:{
        type:[Number],
     },
    history:{
        type: [Object]
    },
    startDate:{
      type:String  
    },
    endDate:{
        type:String
    },
    date:{
        type:String
    },
    ready:{
        type:Number,
        required:true ,
        default:0
    },

});

module.exports =  mongoose.model('Item',itemsSchema);