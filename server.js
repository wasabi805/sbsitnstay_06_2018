// https://expressjs.com/en/api.html
// https://stackoverflow.com/a/40727391/7857134
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

//For routing
const users = require('./routes/api/users');
const siteArea = require('./routes/api/site-area');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//DB config
const db = require('./config/keys').mongoURI;

//Connect to mongoDB
mongoose.connect(db).then(()=>console.log('MongoDB Connected!')).catch(err=>console.log(err));

//Body Parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req,res)=>res.send('Hello'));

//Passport Middleware
app.use(passport.initialize());

//Passport Config (strategy)
require('./config/passport')(passport);

//Use routes : defines full route
app.use('/api/users', users);
app.use('/api/site-area', siteArea);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


const port = process.env.PORT || 5000;

//
app.listen(port, ()=>console.log(`Server running on port ${port}`));