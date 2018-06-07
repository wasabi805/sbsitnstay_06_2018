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

//@route    GET api/posts/
//@desc     Retrieve ALL Posts
//@access   PUBLIC //TODO make this private later


router.get('/', (req,res)=>{
    Post.find()
        .sort({date: -1})
        .then(posts=>res.json(posts))
        .catch(err=> res.status(404)).json({nopostsfound: 'No posts found'})
});


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

//  -----   @prefix routes/api/posts -----

//@route    GET api/posts/:id
//@desc     Retrieve a SINGLE POST by post id
//@access   PUBLIC //TODO make this private later


router.get('/:id', (req,res)=>{
    Post.findById(req.params.id)
        .then(post=>res.json(post))
        .catch(err=> res.status(404)
            .json({nopostfound: 'No post found: (by post id)'}))
});






module.exports = router;