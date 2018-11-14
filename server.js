const bodyParser = require('body-parser');
const User = require("./app/models/user");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const express = require('express');
const config = require("./config");
const morgan = require('morgan');
// const UserRouter = require('./app/controllers/user.controllers').apiRoutes;
var app = express();

// Configuration
const port = process.env.PORT || 8080;
mongoose.connect(config.database, { useNewUrlParser: true });
app.set('superSecret', config.secret);

app.use(bodyParser.json()); // specifing application/json files reqired
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
    res.send('Hello! The API Works!')
});

app.get('/setup', function(req, res) {

    // create a sample user
    var nick = new User({ 
      firstName: 'Nick', 
      lastName: 'Cerminara',
      email:'test@mail.com',
      password: 'password',
      admin: true 
    });
  
    // save the sample user
    nick.save(function(err) {
      if (err) throw err;
  
      console.log('User saved successfully');
      res.json({ success: true });
    });
  });

// --- API Routes ---

// Getting instance of the router for api routes
const apiRoutes = express.Router();

// Route to authentica a user
apiRoutes.post('/authenticate', (req, res) => {

    // Find user by email
    console.log(req.body);
    console.log(req.body.email)
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) throw err; // If there's an error alert

        if (!user) {
            // If there's no user with that email
            res.status(404);
            res.json({"message":"User Not Found"});
        } else if (user) {
            // Check if password
            if (user.password != req.body.password) {
                res.status(403);
                res.json({message:"Wrong Password"});
            } else {
                // If user found and password is correct
                // We don't want to pass the whole user because password is there
                const payload = {admin: user.admin};
                const token = jwt.sign(payload, app.get('superSecret'), {
                    expiresIn: '24h' // Expires in a month
                });
                res.json({"token": token});
            }
        }
    });
});

// Route to veryfy the token
apiRoutes.use( (req, res, next) => {
    // Check header, body, and parameter for the token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log(token);
    // Decode token
    if (token) {
        jwt.verify(token, app.get('superSecret'), (err, success) => {
            if (err) {
                res.status(400)
                return res.json({"error":"Failed to authenticate user"});
            } else {
                res.status(200);
                res.success = success; next();
            }
        });
    } else {
        // If there is no token
        return res.status(403).json({"message":"No Token Provided"})
    }
});

// Default when you go to '/api'
apiRoutes.get('/', (req, res) => {
    res.json({message: 'Best API ever!'});
});

// Get a list of all users
apiRoutes.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        res.json(users);
    });
});


app.use('/api', apiRoutes);

app.listen(port);
console.log('The magic happens at https://localhost:'+port)