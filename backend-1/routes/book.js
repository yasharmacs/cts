var express=require('express');
var router=express.Router();
const Products=require('../model/bookmodel');


router.post('/addbook',(req,res,next)=>{
     const newProsucts=new Products({
        title:req.body.title,
        pagecount:req.body.pagecount,
        publishdate:req.body.publishdate,
        thumbnailUrl:req.body.thumbnailUrl,
        shortdescrption:req.body.shortdescrption,
        longdescrption:req.body.longdescrption,
        author:req.body.author,
        categories:req.body.categories,    
        price:req.body.price,
        currency:req.body.currency,
        discount:req.body.discount,
         
        });
        console.log("ok");
        newProsucts.save().then(result=>{
          res.status(201).json({
          message:'book added',
          result: result
      });
    })
      .catch(err=>{
          res.status(500).json({
            message:"error"
          });
        });
    });
    module.exports = router;