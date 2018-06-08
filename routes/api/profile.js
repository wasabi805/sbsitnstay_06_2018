const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load Validation
const validateProfileInput = require('../../validation/profile');

//Load Profile Model
const Profile = require('../../models/Profile');

//Load User Profile
const User = require('../../models/User');

router.get('/test', (req,res)=>res.json({msg: ' /routes/api/profile/test is working'}));

//  -----   @prefix routes/api/profile -----

//@route    GET api/profile
//@desc     Gets the current users profile
//@access   PRIVATE

//                                    'jwt' comes from config/passport
router.get('/', passport.authenticate('jwt', {session: false}), (req,res)=>{
    //IMPORTANT! recall upon login success we received a token: that token inserted the user into req.user
    // req.user.id

    const errors = {};

    Profile.findOne({user: req.user.id})
        .populate({
            model: 'users',
            path: 'user',
            select: ['firstName', 'lastName', 'email', 'phone']
        })
        .then(profile => {
        //check to see if a profile was sent back with the callback
        if(!profile){
            errors.noprofile = 'There is no profile for this user';
            return  res.status(400).json(errors);
        }

        //send back profile if user id exists in db
        res.json(profile);

    }).catch(err => res.status(404).json(err));
});


//  -----   @prefix routes/api/profile -----

//@route    GET api/profile/all
//@desc     Retrieve ALL users profiles
//@access   PUBLIC

router.get('/all', (req,res)=>{

    const {errors}={};

    Profile.find()
        .populate({
            model: 'users',
            path: 'user',
            select: ['firstName', 'lastName', 'email', 'phone']
    })
        .then(profiles => {
            if(!profiles){
                errors.noprofile = 'There are no profiles';
                return res.status(404).json(errors)
            }
            res.json(profiles)
        })
        .catch()
});


//  -----   @prefix routes/api/profile -----

//@route    GET api/profile/handle/:handle
//@desc     Retrieve user profile by handle
//@access   PUBLIC

router.get('/handle/:handle', (req,res)=>{

    const {errors} = {};

    Profile.findOne({handle: req.params.handle})
        .populate({
            model: 'users',
            path: 'user',
            select: ['firstName', 'lastName', 'email', 'phone']
    }).then(profile =>{
        //if no profile found
        if(!profile){
            errors.noprofile = "This user hasn't set up a profile";
            res.status(404).json(errors);
        }

        res.json(profile);
    })
        .catch(err=> res.status(404)
            .json({profile: 'There are no profiles  : frm profile.js ln 102'} ))
});


//  -----   @prefix routes/api/profile -----

//@route    GET api/profile/user/:user_id
//@desc     Retrieve user profile by user ID
//@access   PUBLIC

router.get('/user/:user_id', (req,res)=>{

    const {errors} = {};

    Profile.findOne({user: req.params.user_id})
        .populate({
            model: 'users',
            path: 'user',
            select: ['firstName', 'lastName', 'email', 'phone']
        }).then(profile =>{
        //if no profile found
        if(!profile){
            errors.noprofile = "This user hasn't set up a profile";
            res.status(404).json(errors);
        }

        res.json(profile);
    })
        .catch(err=> res.status(404)
            .json({profile: 'There is no profile for this user : frm profile.js'} ))
});



//  -----   @prefix routes/api/profile -----

//@route    POST api/profile
//@desc     Create a user profile. UPDATE user profile
//@access   PRIVATE

router.post('/', passport.authenticate('jwt', {session: false}), (req,res)=>{
//IMPORTANT! recall upon login success we received a token: that token inserted the user into req.user
    // req.user.id

    console.log(req.body);
    //-----     Check Validation    -----
    const {errors, isValid} = validateProfileInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    //-----                         -----


    //Get Fields
    const profileFields = {};
    profileFields.user = req.user.id;


    if(req.body.handle){
        //checks if the data was actually sent from the form: if true add the handle from post to profileFields {}
        profileFields.handle = req.body.handle;
    }

    if(req.body.dogName){
        profileFields.dogName = req.body.dogName;
    }

    if(req.body.breed){
        profileFields.breed = req.body.breed;
    }

    if(req.body.age){
        profileFields.age = req.body.age;
    }

    if(req.body.admin){
        profileFields.admin = req.body.admin;
    }

    Profile.findOne({user: req.user.id})
        .then(profile =>{
            //check if profile exists: if so, then update NOT create another new one
            if(profile){
                Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true})
                    .then(profile =>
                        res.json(profile)
                    );
            }
            //create a profile
            else{
                //1st, check if handle exists
                Profile.findOne({handle: profileFields.handle})
                    .then(profile=>{
                        //if handle matches, send error and let user know they can't use that name
                        if(profile){
                            errors.handle = 'That Handle already exists';
                            res.status(400).json(errors);
                        }
                    });
                //Save Profile
                new Profile(profileFields).save()
                    .then(profile=> res.json(profile));
            }
        })

});

//  -----   @prefix routes/api/profile -----

//@route    POST api/profile/handle/:handle
//@desc     Retrieve user profile by handle
//@access   PUBLIC



//  -----   @prefix routes/api/profile -----

//@route    GET api/profile/admin
//@desc     Retrieve ALL user profiles for ADMINS
//@access   PUBLIC

//NOTE: same approach to adding likes to an ARRAY
//will probably use unshift()
router.get('/users/admin/addClient', (req,res)=>{

    const {errors}={};

    Profile.find()
        .populate({
            model: 'users',
            path: 'user',
            select: ['firstName', 'lastName','email', 'phone']
        })
        .then(profiles => {

            if(!profiles){
                errors.noprofile = 'There are no profiles';
                return res.status(404).json(errors)
            }
            res.json(profiles)
        })
        .catch();


});

//  -----   @prefix routes/api/profile/ -----

//@route    POST api/profile/users/admin/addClient/:id
//@desc     Allows Admin to find single account by user_id
//@access   Private

router.post('/users/admin/addClient/:id', passport.authenticate('jwt', {session: false}), (req,res)=>{

    Profile.findOne({user: req.user.id}).then((profile)=> {

        Profile.findById(req.params.id)

            .then(addClient => {
                if(addClient.admin.filter(add => add.user.toString() === req.user.id).length > 0){
                    return res.status(400).json({alreadyAdded: 'This client already belongs to ...' })
                }
                //Add logged in user id to the admin array of another user

                addClient.admin.unshift({user: req.user.id});

                addClient.save().then(add => res.json(add))

            }).catch(err=> res.status(404).json({profilenotfound : "No Profile by this user id was found"}))

        })

});

//  -----   @prefix routes/api/profile/ -----

//@route    POST api/profile/users/admin/removeClient/:id
//@desc     REMOVE Admin from client profile
//@access   Private

router.post('/users/admin/removeClient/:id', passport.authenticate('jwt', {session: false}), (req,res)=>{

    Profile.findOne({user: req.user.id}).then((profile)=> {

        Profile.findById(req.params.id)

            .then(addClient => {
                //checks to see if logged in admin is already in the client admin array
                if(addClient.admin.filter(add => add.user.toString() === req.user.id).length === 0){
                    return res.status(400).json({notYetAdded: 'This Client is available' })
                }
                //Get the index to remove
                const removeIndex = addClient.admin.map(item => item.user.toString()).indexOf(req.user.id); //<--this is the admin to remove

                // //Splice out now
                addClient.admin.splice(removeIndex, 1);
                //
                // //Save
                addClient.save().then(addClient =>res.json({addClient}) );

            }).catch(err=> res.status(404).json({profilenotfound : "No Profile by this user id was found"}))

    })

});



module.exports = router;