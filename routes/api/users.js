const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const User = require('../../models/User');


//  -----   @prefix routes/api/users -----

//@route    Get api/users/test
//@desc     used to test routes
//@access   PUBLIC

router.get('/test', (req,res)=>res.json({msg: ' /routes/api/users/test is working'}));


//  -----   @prefix routes/api/users -----

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
                    phone: req.body.phone,
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

//  -----   @prefix routes/api/users -----

//@route    Get api/users/login
//@desc     used to register an Admin
//@access   PUBLIC
router.post('/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

        //find user by email
    User.findOne({email: email}).then(user => {
        if(!user){
            return res.status(404).json({email: 'User not found'})
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

//  -----   @prefix routes/api/users -----

//@route    Get api/users/current
//@desc     route returns current user
//@access   PRIVATE

router.get('/current', passport.authenticate('jwt', {session: false}), (req,res)=>{
    // res.json(req.user) // remember, if auth @login is successful, the user data is in the req
    //so we don't send the admin pw (like in the line above), we'll make the response omit the pw
    res.json({
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        phone: req.user.phone,
        email: req.user.email
    })
});



module.exports = router;
