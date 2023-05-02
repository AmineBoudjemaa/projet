const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const {User,Student, Teacher,Admin} = require('../models/user');
const AppErr = require('../utils/appErr');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect',
        passReqToCallback: true
    }, (req,accessToken, refreshToken, profile, done) => {
        console.log('from setup',req.session)
        // passport callback function
        User.findOne({googleId: profile.id}).then(async(currentUser) => {
            if(currentUser){
                console.log('current user--------------------------------------------',currentUser)
                if(currentUser.role==='teacher') {const teacher = await Teacher.findOne({googleId: profile.id}); if(!teacher) {const err = new Error('you must sign up');done(err,null)}}
                if(currentUser.role==='student') {const student = await Student.findOne({googleId: profile.id}); if(!student) {const err = new Error('you must sign up');done(err,null)}}
                if(currentUser.role==='admin') {const admin = await Admin.findOne({googleId: profile.id}); if(!admin) {const err = new Error('you must sign up');done(err,null)}}
                // already have this user
                req.session.additionalFields=null
                done(null, currentUser);
                // do something
            } else {
                // if not, create user in our db
                if(req.session.additionalFields){
                    if(profile.id === process.env.superAdminId){
                    new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    email:profile._json.email,
                    name:profile.displayName,
                    role:'super admin',
                    }).save().then(async(superAdmin)=>{
                        
                        done(null,superAdmin);
                    })
                }else{
                new Student({
                    googleId: profile.id,
                    email:profile._json.email,
                    name:profile.displayName,
                    role:'student',
                    //get the other informations 
                    username: req.session.additionalFields.name,
                    academicLevel:req.session.additionalFields.academicLevel,
                    phone:req.session.additionalFields.tel,
                    address:req.session.additionalFields.address,
                }).save().then(async (newUser) => {
                    done(null, newUser);
                });
                }
                }else{
                    //you must sign up
                    // const err = new Error('you must sign up first')
                    // err.status = 401
                    // done(err,null);
                    
                    const err = new Error('you must sign up');
                    done(err,null)
                }
                
            }
            
        });
    })
);