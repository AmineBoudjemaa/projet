const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const {User , Student , Teacher} = require('../models/user');
const joi = require('joi');
const {courseSchema,courseEditSchema} = require('../schemas');

//utils
const catchAsync = require('../utils/catchAsync');
const validate = require('../utils/validate');
const AppErr = require('../utils/appErr');
const isLoggedIn = require('../utils/isLoggedIn');
const isTeacher = require('../utils/isTeacher');
const isOwner = require('../utils/isOwner');

//validating middleware
// const validateCourse=validate(courseSchema);

// const addTeacher = async (req,res,next)=>{
//     const c = await Course.findById(req.params.id).populate('teacher');
//     req.body.course.teacher = c.teacher.name;
//     next();
// };


//see courses
router.get('/', catchAsync(async(req,res)=>{
    const courses = await Course.find({}).populate('teacher');
    if(courses) return res.status(200).send(courses);
    res.status(500).send({message:'no courses found'});
}));

//new course
router.post('/',isLoggedIn,isTeacher,catchAsync(async (req, res) => {
    const teacher = await Teacher.findById(req.user._id);
    if(!teacher) return res.status(400).send({message:'teacher not found'});
    req.body.teacher=teacher;
    const { error } = courseSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        res.status(400).send(msg)
    }
    const course = new Course(req.body);
    await course.save()
    .then(async newCourse=>{
        const teacher = await Teacher.findByIdAndUpdate(
            req.user._id ,
            { $addToSet: { courses: newCourse } },
            { new: true }
          )

          const populatedTeacher = await teacher.populate('courses')
          console.log('-------------------------______',{newCourse,populatedTeacher})
          req.user=populatedTeacher
          console.log('req.user',req.user)
          res.status(200).send(newCourse);
    })
    .catch(err=>{
        res.status(500).send(err.message);
    })
}));

//show
router.get('/:id', catchAsync(async (req, res,) => {
    const course = await Course.findById(req.params.id);
    if(course) return res.status(200).send(course);
    res.status(400).send({message:'course not found'});
}));

//edit
router.put('/:id',isLoggedIn,isOwner,catchAsync(async (req, res) => {
    const { id } = req.params;
    const course = Course.findById(id);
    const {title,description,price,link,type,category,hours,certificate,subscribe,img}=req.body;
    const { error } = courseEditSchema.validate({title,description,price,link,type,category,hours,certificate,subscribe,img});
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        res.status(400).send({message:msg});    
    }
    const updatedCourse = await Course.findByIdAndUpdate(id, {title,description,price,link,type,category,hours,certificate,subscribe,img},{new:true})
    .catch(err=>{
        return res.status(400).send({err})
    })
    if(course) return res.status(200).send(updatedCourse);
}));

//delete
router.delete('/:id',catchAsync(async (req, res) => {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    await Teacher.findByIdAndUpdate(course.teacher,{$pull:{courses:course.id}},{new:true})
    if(course) return res.status(200).send(course);
    res.status(400).send({message:'course not found'});
}));

router.post('/:id/subscribe',catchAsync(async (req,res)=>{
    const { id } = req.params;
    const student = await Student.findById(req.user._id);
    if(!student) throw new AppErr('student not found',400);
    const updatedCourse = await Course.findByIdAndUpdate(
        id ,
        { $addToSet: { waitlist: student._Id } },
        { new: true }
      );
    if(!updatedCourse) throw new AppErr('course not found',400);
    const updatedStudent = await Student.findByIdAndUpdate(
        student._id ,
        { $addToSet: { appliedCourses: id } },
        { new: true }
      );
    if (!updatedStudent) throw new AppErr('something is wrong',500);
    req.user=updatedStudent;
    res.status(200).send(updatedCourse);
}));

router.post('/:id/confirm', async (req,res)=>{
    const { id } = req.params;
    const student = await Student.findById(req.user._id);
    if(!student) throw new AppErr('student not found',400);
    const updatedCourse = await Course.findByIdAndUpdate(id,
        {$pull:{waitlist:student._id},$addToSet:{students:student._id}},
        {new:true});
    if(!updatedCourse) throw new AppErr('course not found',400)
    const updatedStudent = await Student.findByIdAndUpdate(
        student._id ,
        { 
            $pull:{appliedCourses:id} ,
            $addToSet:{enrolledCourses:id} ,
            $addToSet: {teachers: updatedCourse.teacher}
        },
        {new:true});
    if (!updatedStudent) throw new AppErr('something is wrong',500);
    req.user=updatedStudent;
    res.status(200).send(updatedCourse);
});

router.delete('/:id/subscribe',catchAsync(async(req,res)=>{
    const { id } = req.params;
    const student = await Student.findById(req.query.s);
    if(!student) throw new AppErr('student not found',400);
    const updatedCourse = await Course.findByIdAndUpdate(id,{$pull:{waitlist:student._id}},{new:true});
    if(!updatedCourse) throw new AppErr('course not found',400)
    const updatedStudent = await Student.findByIdAndUpdate(
        student._id ,
        { $pull: { appliedCourses: id } },
        { new: true }
      );
    if (!updatedStudent) throw new AppErr('something is wrong',500);
    req.user=updatedStudent;
    res.send(updatedCourse);
}));

module.exports = router;