const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Post Model
const Post = require('../../models/Post');
//Validation
const validatePostInput = require('../../validation/post');

//test route
router.get('/test', (req,res)=> res.json({msg: 'Post Works'}));

//  -----   @prefix routes/api/posts -----

//@route    POST api/posts/test
//@desc     CREATE a Post
//@access   PRIVATE

router.post('/', passport.authenticate('jwt', {session : false}), (req,res)=>{

    //-----     Validation      -----
    const {errors, isValid} = validatePostInput(req.body);
    if(!isValid){
        return res.status(400).json(errors)
    }
    //-----                     -----

    const newPost = new Post({
        text: req.body.text,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: req.body.avatar,
        user: req.user.id,
    });

    newPost.save().then(post=> res.json(post))

});


// router.post('/', (req,res)=> {
//
//     console.log(req.body);
//     res.json({msg: 'test'})
// });



module.exports = router;