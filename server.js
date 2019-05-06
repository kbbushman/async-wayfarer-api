const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 4000;

// Controllers
const authCtrl = require('./controllers/authController');
const usersCtrl = require('./controllers/usersController');
const postsCtrl = require('./controllers/postsController');
const citiesCtrl = require('./controllers/citiesController');

// --------------------------------------------- MIDDLEWARE --------------------------------------------- //

// Express Session
app.use(session({
  secret: 'SSShhhhhh, this is a secret...',
  resave: false,
  saveUninitialized: false,
  cookie: { path: '/', secure: true, httpOnly: false },
  name: 'wsid',
}));

// BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const corsOptions = {
  origin: ['http://localhost:3000', 'https://wayfarer-react.herokuapp.com'], // string or array
  credentials: true, // This allows the session cookie to be sent back and forth
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));


// -------------------------------------------- API ENDPOINTS -------------------------------------------- //

// GET Root Route
app.get('/', (req, res) => res.send('<h1>Welcome to the Wayfarer API</h1>'));

// Auth Routes
app.use('/api/v1/auth', authCtrl);
// User Routes
app.use('/api/v1/users', usersCtrl);
// Post Routes
app.use('/api/v1/posts', postsCtrl);
// City Routes
app.use('/api/v1/cities', citiesCtrl);

// -------------------------------------------- START SERVER-------------------------------------------- //

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
