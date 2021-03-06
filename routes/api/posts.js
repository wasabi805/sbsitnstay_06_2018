const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Models
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
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
        .catch(err=> res.status(404).json({nopostsfound: 'No posts found'}))
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

//  -----   @prefix routes/api/posts -----

//@route    DELETE api/posts/:id
//@desc     deletes a SINGLE POST by post id
//@access   PRIVATE //TODO make this private later

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req,res)=>{
    //find the profile of the logged in user
    Profile.findOne({user: req.user.id})
        .then(profile=>{
            //find the exact post by id
            Post.findById(req.params.id)
            //then Check for post owner : recall that postSchema refs user Schema to populate user's data in Post Model
                .then(post => {
                if(post.user.toString() !== req.user.id){
                    return res.status(401).json({notauthorized: 'User not authorized'})
                }
                //if passes auth, delete the post
                 post.remove().then(()=> res.json({ success : true, msg: 'Post successfully deleted'}))
                     .catch(err=> res.status(404).json({postnotfound : 'No post found'}));
            })
    })
});

//  -----   @prefix routes/api/posts -----

//@route    POST api/posts/comment/:id      <-- Note: The ':id' refs the post id
//@desc     Add COMMENT to a Post
//@access   PRIVATE


router.post('/comment/:id', passport.authenticate('jwt', {session: false}), (req,res)=>{

    //-----     Validation      -----
    const {errors, isValid} = validatePostInput(req.body);
    if(!isValid){
        return res.status(400).json(errors)
    }
    //-----

    Post.findById(req.params.id)
        .then(post=>{
            //create a new comment obj to insert
            const newComment = {
                text: req.body.text,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                avatar: req.body.avatar,
                user: req.user.id
            };

            //Add to comments array
            post.comments.unshift(newComment);

            //save
            post.save().then(post=>res.json(post))

        }).catch(err=> res.status(404).json({nopostfound: 'No post found'}))
});

//  -----   @prefix routes/api/posts -----

//@route    DELETE api/posts/comment/:id/:comment_id      <-- Note: The ':id' refs the post id
//@desc     REMOVE a COMMENT from a Post
//@access   PRIVATE


router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}), (req,res)=>{


    Post.findById(req.params.id)
        .then(post=>{
            //check to see if the comment exists : if comment_id in db matches URL param comment_id...
            if(post.comments.filter(
                comment => comment._id.toString() === req.params.comment_id).length === 0){ //if true, (length == 0) there's no comment in the array
                return res.status(404).json({nocommentfound: "Comment doesn't exist"})
            }

            //get remove index
            const removeIndex = post.comments.map(item=> item._id.toString())
                .indexOf(req.params.comment_id);

            //splice
            post.comments.splice(removeIndex,1);

            //save
            post.save().then((post)=>res.json(post))

        }).catch(err=> res.status(404).json({nopostfound: 'No post found'}))
});


module.exports = router;