const express = require('express');
const router = express.Router();
const {User,Teacher,Student} = require('../models/user');
const {teacherSchema} = require('../schemas');
const joi = require('joi');

//utils
const catchAsync = require('../utils/catchAsync');
const AppErr = require('../utils/appErr');
const validate = require('../utils/validate');
const isAuthZ = require('../utils/isAuthZ');
const isLoggedIn = require('../utils/isLoggedIn');
const isTeacher=isAuthZ(['teacher']);

const isOwner = async(req,res,next)=>{
    const { id } = req.params;
    const teacher = await User.findById(id);
    if (!(['teacher'].includes(req.user.role))) {
        req.flash('error','you must be a teacher');
        return res.redirect('/');
    }else if(!(toString(req.user._id) === toString(teacher._id))){
        req.flash('error','you must be the owner');
        return res.redirect('/');
    }
    next();
}

const deleteAuth = async(req,res,next)=>{
    const { id } = req.params;
    const teacher = await User.findById(id);
    if(!(['admin','super admin'].includes(req.user.role)) || (req.user.role === 'teacher' && (toString(req.user._id) === toString(teacher._id)))){
        req.flash('error','not authorized');
        return res.redirect('/');
    }
    next();
}

//validating middleware
const validateTeacher=validate(teacherSchema);
const addEmail = catchAsync(async(req,res,next)=>{
    const { id } = req.params;
    const teacher = await User.findById(id);
    req.body.teacher.email=teacher.email;
    next();
});

////////// teacher crud

//show teachers
router.get('/', catchAsync(async(req, res) => {
    const teachers = await Teacher.find({})
        .populate('courses') // chain populate method to include full courses
        .catch(err => {
            return res.status(400).send({err});
        })
    res.status(200).send(teachers); // send the populated teachers
}));


//new teacher
// router.get('/new',catchAsync(async(req,res)=>{
//     const users = await User.find({role:{$nin:['super admin','teacher']}});
//     res.render('teachers/new', { users , title:'add teacher' });
// }));

//create teacher
router.post('/:id',catchAsync(async (req, res) => {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);
    const {username,googleId,email,img,phone} = student;
    const teacher = await new Teacher({username,googleId,email,img,phone,role:'teacher',description:'teacher description'})
    await teacher.save();
    if(teacher) return res.status(200).send(teacher);
}));

router.get('/:id',catchAsync(async(req,res)=>{
    const { id } = req.params;
    const teacher = await Teacher.findById(id);
    res.render('teachers/profile',{ teacher , title:'profile' });
}));

// router.get('/:id/edit',isLoggedIn , isOwner ,catchAsync(async(req,res)=>{
//     res.render('teachers/edit',{ title:'edit profile' });
// }));

router.put('/:id'/*,isLoggedIn */,catchAsync(async(req,res)=>{
    const { id } = req.params;
    const updatedTeacher = await Teacher.findByIdAndUpdate(id, { ...req.body },{new:true});
    if (!updatedTeacher) res.status(400).send({message:'err'});
    req.session.user = updatedTeacher;
    res.status(200).send(updatedTeacher);
}));

router.delete('/:id',isLoggedIn,deleteAuth,catchAsync(async(req,res)=>{
    const { id } = req.params;
    const deletedTeacher = await Teacher.findByIdAndDelete(id);
    if(deletedTeacher) res.status(500).send({message:'something went wrong deleting'});
    res.status(200).send(deletedTeacher);
}));

// //create a teacher
// router.get('/new',(req,res)=>{
//     res.render('teachers/new', {title:'register'});
// });

// router.post('/', validateTeacher ,catchAsync(async (req, res) => {
//     const teacher = new Teacher(req.body.teacher);
//     await teacher.save();
//     req.flash('sucess','successfully created a teacher\'s profile');
//     res.redirect('/teachers');
// }));

// //show teacher
// router.get('/:id',catchAsync(async (req, res,) => {
//     const teacher = await Teacher.findById(req.params.id).populate('courses');
//     if (!teacher) {
//         req.flash('error', 'Cannot find that teacher!');
//         return res.redirect('/teachers');
//     }
//     res.render('teachers/profile', { teacher , title:teacher.name});
// }));

// //edit teacher
// router.get('/:id/edit', isLoggedIn , isTeacher ,catchAsync(async (req, res) => {
//     const teacher = await Teacher.findById(req.params.id);
//     if (!teacher) {
//         req.flash('error', 'Cannot find that teacher!');
//         return res.redirect('/teachers');
//     };
//     res.render('teachers/edit', { teacher , title:'edit profile' });
// }));

// router.put('/:id', isLoggedIn , isTeacher ,addEmail , validateTeacher ,catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const updatedTeacher = await Teacher.findByIdAndUpdate(id, { ...req.body.teacher });
//     req.flash('sucess','successfully updated the teacher\'s profile');
//     res.redirect(`/teachers/${updatedTeacher._id}`);
// }));

// //delete profile
// router.delete('/:id',catchAsync(async (req, res) => {
//     const { id } = req.params;
//     await Teacher.findByIdAndDelete(id);
//     req.flash('sucess','successfully deleted the teacher\'s profile');
//     res.redirect('/teachers');
// }));

module.exports = router;