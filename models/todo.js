const mongoose=require('mongoose');
const todoSchema=new mongoose.Schema( {
    desc:{
        type:String,
        required: true
    },
     date:{
        type: Date,
        required: true
     },
     categ:{
        type: String,
        required: true
     }
})

const Todo=mongoose.model('Todo', todoSchema);
module.exports=Todo;
