var express=require('express');
var mongoose=require('mongoose');
var bodyparser=require('body-parser');
var cors = require('cors');
var app=express();
const route =require('./routes/user')



mongoose.connect('mongodb+srv://yash:yash1234@cluster0.x79cl.mongodb.net/Books?retryWrites=true&w=majority');

mongoose.connection.on('connected',()=>{
    console.log('db cnnected');
});
mongoose.connection.on('error',(err)=>{
    console.log(err);
});

const PORT=3000;

 
app.use(cors());
app.use(express.json());
app.use('/api',route);

app.listen(PORT,()=>{
    console.log('server started at port:',PORT);
});