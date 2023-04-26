const router = require('express').Router();
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
const MongoStore = require('connect-mongo');
const cookie = require('cookie');
const Joi = require('joi')




router.use(session({
    secret: process.env.sessionKey,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
}));

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

router.get('/loginf',(req,res)=>{
  console.log('sign up');
  res.redirect(`${process.env.CLIENT_URL}/signup`);
});

router.post('/signup',(req,res)=>{
  if(req.body)  {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      tel: Joi.string().regex(/^(\+213|0)(5|6|7)\d{8}$/).required(),
    });
    const { error } = schema.validate(req.body);
    if(!error){
    req.session.additionalFields = {name:req.body.name,tel:req.body.tel};
    return res.status(200).send({message:'infos sent successfully'});
    }else{
      return res.status(400).send({message:error.details[0].message})
    }

  }else{
    return res.status(400).send({message:'infos missing'})
  }
})

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
},passport.authenticate('google', {scope: ['profile','email']}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google') , (req, res) => {
    console.log('from redirect',req.session)
    res.redirect(`${process.env.CLIENT_URL}`);
    // res.status(200).send()
});



router.get('/me', (req, res) => {
    console.log(req.session)
    if (req.user) {
      res.send(req.user);
    } else {
      res.status(401).json({ message: 'Not authenticated' });
    }
  });

module.exports = router;