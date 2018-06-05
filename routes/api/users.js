const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../../models/User');


//  -----   @prefix routes/api/users -----

//@route    Get api/users/test
//@desc     used to test routes
//@access   PUBLIC

router.get('/test', (req,res)=>res.json({msg: ' /routes/api/users/test is working'}));


//  -----   @prefix routes/api/users -----

//@route    Get api/users/test
//@desc     used to test routes
//@access   PUBLIC

router.post('/register', (req,res)=>{

    User.findOne({email: req.body.email})
        .then(user => {
            if(user){
                return res.status(400).json({email: "Email already exists"});
            }
            else{

                const newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err,salt)=>{
                    bcrypt.hash(newUser.password, salt, (err,hash)=>{
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save().then(user => res.json(user)).catch(err => console.log(err))
                    })
                })
            }
        })
});





module.exports = router;
