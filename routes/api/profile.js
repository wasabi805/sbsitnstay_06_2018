const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load Profile Model
const Profile = require('../../models/Profile');

//Load User Profile
const User = require('../../models/User');

router.get('/test', (req,res)=>res.json({msg: ' /routes/api/profile/test is working'}));

//  -----   @prefix routes/api/profile -----

//@route    Get api/profile
//@desc     Gets the current users profile
//@access   PRIVATE


//                                    'jwt' comes from config/passport
router.get('/', passport.authenticate('jwt', {session: false}), (req,res)=>{
    //IMPORTANT! recall upon login success we received a token: that token inserted the user into req.user
    // req.user.id

    const errors = {};

    Profile.findOne({user: req.user.id}).then(profile => {
        //check to see if a profile was sent back with the callback
        if(!profile){
            errors.noprofile = 'There is no profile for this user';
            return  res.status(400).json(errors);
        }

        //send back profile if user id exists in db
        res.json(profile);

    }).catch(err => res.status(404).json(err));
});





module.exports = router;