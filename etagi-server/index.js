const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const flash = require('express-flash');
const session = require('express-session')

const dbQueries = require('./db/queries');


const app = express()

//dbQueries.getUserByName('user3').then(row => console.log(row)); 
//var a = dbQueries.getUserById(0).then(row => console.log(row));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(flash());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

const initializePassport = require('./auth/passport-config')
initializePassport(
    passport,
    dbQueries.getUserByName,
    dbQueries.getUserById
)

const tasks = require('./routes/api/tasks');
const users = require('./routes/api/users');

app.use('/api/tasks', tasks);
app.use('/api/users', users);

const port = 5000

app.listen(port, () => console.log('Server started at 5000'))
