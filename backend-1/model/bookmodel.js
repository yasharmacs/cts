const mongoose=require('mongoose');

const ProductsSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    pagecount:{
        type:String,
        required:true
    },
    publishdate:{
        type:String,
        required:true
    },
    thumbnailUrl:{
        type:String,
        required:true
    },
    shortdescrption:{
        type:String,
        required:true
    },
    longdescrption:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    categories:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
    discount:{
        type:String,
        required:true
    },
    createdAt:{
         type:Date,
         default:Date.now
        },
});


const Products=module.exports=mongoose.model('Products',ProductsSchema);