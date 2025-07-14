const mongoose=require('mongoose');

const schedulelecSchema=new mongoose.Schema({
    instructor:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required:true
    },
    course:{
        type: String,
        required: true
    },
    lec:{
        type: String,
        required: true 
    },
    location:{
        type: String,
        required: true 
    }
});
module.exports=mongoose.model('schedulelec',schedulelecSchema);