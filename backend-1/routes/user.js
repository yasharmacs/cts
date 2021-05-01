var express=require('express');
 
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
var router=express.Router();
const user=require('../model/usermodel');
 
// router.get('/users',(req,res,next)=>{
//    user.find(function(err,users){
//        if(err){
//            res.json(err);
//        }else{
//            res.json(users);
//        }
//    });
// });

//saving user
router.post('/signup',(req,res,next)=>{
    bcrypt.hash(req.body.password,10)
    .then(hash=>{
        const newuser=new user({
            username:req.body.username,
            phnnumber:req.body.phnnumber,
            email:req.body.email,
            password:hash
        });
      newuser.save().then(result=>{
          res.status(201).json({
          message:'user created',
          result: result
      });
    })
      .catch(err=>{
          res.status(500).json({
            message:"Email already exists"
          });
        });
    });
 });

 router.post("/login",(req,res,next)=>{
    let fetchedUser;
   user.findOne({email: req.body.email})
   .then(user=>{
       console.log(user);
       if(!user){
           req.status(401).json({
               message:"Invalid User"
           });
       }
       fetchedUser = user;
       return bcrypt.compare(req.body.password,user.password)
   })
   .then(result=>{
      
       if(!result){
        req.status(401).json({
            message:"Invalid Password"
       });
       }
    const token=jwt.sign({email:fetchedUser.email},'secret_this_should_be_longer',
    {expiresIn:"1h"});
    res.status(200).json({
     token:token,
     expiresIn:3600,
     emailId:fetchedUser.email
    });
    
   })
   .catch(err=>{
    req.status(401).json({
        message:"Invalid authentication credentials"
   });
 });
});

//  //authenticate
//  router.post('/authenticate', (req,res,next)=>{
//     passport.authenticate('local', (err, user, info) => {       
//         // error from passport middleware
//         if (err) return res.status(400).json(err);
//         // registered user
//         else if (user) return res.status(200).json({ "token": user.generateJwt() });
//         // unknown user or wrong password
//         else return res.status(404).json(info);
//     })(req, res)
//  });

//  //user profile

//  router.get('/userProfile',jwtHelper.verifyJwtToken,(req,res,next)=>{
//     User.findOne({ _id: req._id },
//         (err, user) => {
//             if (!user)
//                 return res.status(404).json({ status: false, message: 'User record not found.' });
//             else
//                 return res.status(200).json({ status: true, user : _.pick(user,['email']) });
//         }
//     );
//  });

router.post('/getuserbyemail',(req,res)=>{
    try{
        user.find({email : req.body.email},(err,data)=>{
            if (err) {
                console.log(err);
                res.send(err)
             } 
            else{
                res.json(data)
            }
        })
    }
    catch{
        res.send("No data")
    }
    
})

module.exports = router;