const express = require('express');
const router = express.Router();

//  -----   @prefix routes/api/users -----

//@route    Get api/users/test
//@desc     used to test routes
//@access   PUBLIC

router.get('/test', (req,res)=>res.json({msg: ' /routes/api/users/test is working'}));


module.exports = router;
