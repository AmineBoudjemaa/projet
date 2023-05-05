const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
// const flash = require('connect-flash');
const passportSetup = require('./config/passport-setup');
const MongoStore = require('connect-mongo');
const cors = require("cors");
const bodyParser = require('body-parser');



//utils
const AppErr = require('./utils/appErr');
const isLoggedIn = require('./utils/isLoggedIn');
const isSuperAdmin = require('./utils/isSuperAdmin');
const isAdmin = require('./utils/isAdmin');


//run express
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.sessionKey,
  cookie:{ 
    httpOnly:true,
    expires: Date.now() + 1000*60*60*24*7 ,
    maxAge: 1000*60*60*24*7,
  },
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
}));
// app.use(flash());//not in use

app.use(//cors()
  cors({
    origin: `${process.env.CLIENT_URL}`,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);


app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
mongoose.set('strictQuery', false);
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true,})
  .then(console.log('database connected port: ',process.env.MONGO_URL));
};

// app.use((req,res,next)=>{
//   res.locals.currentUser = req.user;
//   console.log('user',req.user);
//   console.log('session',req.session);
//   console.log('cookies',req.cookies)
//   console.log('singed cookies',req.signedCookies)
//   next();
// });

//routes
const courses = require('./routes/courses');
const teachers = require('./routes/teachers');
const students = require('./routes/students');
const authRoutes = require('./routes/auth-routes');
// const superAdmin = require('./routes/super-admin');
const admins = require('./routes/admins');
const home = require('./routes/home');

///////////////////////////////////////////////////the home route
app.get('/', (req, res) => {
    res.render('home.ejs',{title:'home'});
});

app.use('/courses',courses);
app.use('/teachers',teachers);
app.use('/students',students);
app.use('/auth', authRoutes);
// app.use('/superadmin', isLoggedIn , isSuperAdmin , superAdmin);
app.use('/admins', admins);
app.use('/home',home);


app.get('/error',(req,res)=>{
  kdso;
});

// 404 handler
app.all('*',(req,res,next)=>{
  res.status(404).send({message:'not found'})
});

// error handler
app.use((err,req,res,next)=>{
  const {statusCode= 500 , message= 'something went wrong' } = err;
  res.status(statusCode);
  if(message=='you must sign up'){
    return res.redirect(`${process.env.CLIENT_URL}/sign-up`)
  }
  if(message=='already signed in'){
    console.log('the already signed in worked')
    return res.redirect(`${process.env.CLIENT_URL}`)
  }
  console.log('from error handler ------------------------------------------------',err);
  next();
});

//port
app.listen(process.env.PORT, () => {
    console.log('Serving on port:',process.env.PORT);
});