const router = require('express').Router();
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
const MongoStore = require('connect-mongo');
const cookie = require('cookie');




router.use(session({
    secret: process.env.sessionKey,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
}));
  

const addSignupFields = (req,res,next)=>{
  if(req.body.additionalFields)  req.session.additionalFields = req.body.additionalFields;
  next();
}

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

router.get('/loginf',(req,res)=>{
  console.log('sign up');
  res.redirect(`${process.env.CLIENT_URL}/signup`);
});

router.post('/signup',addSignupFields,passport.authenticate('google', {scope: ['profile','email']}))

// auth logout
router.get('/logout', (req, res) => {
    console.log('beofre destroy',req.session,req.cookies)
    req.logout();
    res.clearCookie('connect.sid');
    console.log('after logout',req.session , req.cookies,req.user)

    res.redirect(`${process.env.CLIENT_URL}`);
});

router.get('/test',(req,res)=>{
  console.log('test')
  res.redirect(`${process.env.CLIENT_URL}`)
})

// auth with google
router.get('/google',(req,res,next)=>{
  if(req.user){
    throw new Error('already signed in');
  }
  next();
},addSignupFields,passport.authenticate('google', {scope: ['profile','email']}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google') , (req, res) => {
    console.log('from redirect',req.session)
    res.redirect(`${process.env.CLIENT_URL}`);
    // res.status(200).send()
});



router.get('/me', (req, res) => {
    console.log(req.session)
    if (req.session.user) {
      res.send(req.session.user);
    } else {
      res.status(401).json({ message: 'Not authenticated' });
    }
  });

module.exports = router;