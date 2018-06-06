const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const User = require('../../models/User');


//  -----   @prefix routes/api/users -----

//@route    Get api/users/test
//@desc     used to test routes
//@access   PUBLIC

router.get('/test', (req,res)=>res.json({msg: ' /routes/api/users/test is working'}));


//  -----   @prefix routes/api/register -----

//@route    Get api/users/register
//@desc     used to register an Admin
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

//  -----   @prefix routes/api/login -----

//@route    Get api/users/login
//@desc     used to register an Admin
//@access   PUBLIC
router.post('/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

        //find user by email
    User.findOne({email: email}).then(user => {
        if(!user){
            return res.staus(404).json({email: 'User not found'})
        }
        //check pw : user.password ==> hashed pw in db
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(isMatch){
                    //User matched
                    const payload ={
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        phone: user.phone
                    };

                    //Sign Token
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {expiresIn: 7200},
                        (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                    });
                }
                else{
                    return res.status(400).json({password: 'Password incorrect'});
                }
            })


    })
});



module.exports = router;
