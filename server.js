const express = require('express');
const mongoose = require('mongoose');

const app = express();

//For routing
const users = require('./routes/api/users');
const siteArea = require('./routes/api/site-area');


//DB config
const db = require('./config/keys').mongoURI;

//Connect to mongoDB
mongoose.connect(db).then(()=>console.log('MongoDB Connected!')).catch(err=>console.log(err));


app.get('/', (req,res)=>res.send('Hello'));


//Use routes : defines full route
app.use('/api/users', users);
app.use('/api/site-area', siteArea);


const port = process.env.PORT || 5000;

//
app.listen(port, ()=>console.log(`Server running on port ${port}`));