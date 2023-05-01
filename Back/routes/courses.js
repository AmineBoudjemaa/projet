const express = require("express");
const router = express.Router();
const Course = require("../models/course");
const { User, Student, Teacher } = require("../models/user");
const joi = require("joi");
const { courseSchema, courseEditSchema } = require("../schemas");

//utils
const catchAsync = require("../utils/catchAsync");
const validate = require("../utils/validate");
const AppErr = require("../utils/appErr");
const isLoggedIn = require("../utils/isLoggedIn");
const isTeacher = require("../utils/isTeacher");
const isOwner = require("../utils/isOwner");

//validating middleware
// const validateCourse=validate(courseSchema);

// const addTeacher = async (req,res,next)=>{
//     const c = await Course.findById(req.params.id).populate('teacher');
//     req.body.course.teacher = c.teacher.name;
//     next();
// };

//see courses
router.get(
  "/",
  catchAsync(async (req, res) => {
    const courses = await Course.find({}).populate(["teacher",'waitlist','students']);
    if (courses) return res.status(200).send(courses);
    res.status(500).send({ message: "no courses found" });
  })
);

//new course
router.post(
  "/",
  isLoggedIn,
  isTeacher,
  catchAsync(async (req, res) => {
    const teacher = await Teacher.findById(req.user._id);
    if (!teacher) return res.status(400).send({ message: "teacher not found" });
    req.body.teacher = teacher;
    const { error } = courseSchema.validate(req.body);
    if (error) {
      const msg = error.details.map((el) => el.message).join(",");
      res.status(400).send(msg);
    }
    const course = new Course(req.body);
    await course
      .save()
      .then(async (newCourse) => {
        const teacher = await Teacher.findByIdAndUpdate(
          req.user._id,
          { $addToSet: { courses: newCourse } },
          { new: true }
        );

        const populatedTeacher = await teacher.populate("courses");
        console.log("-------------------------______", {
          newCourse,
          populatedTeacher,
        });
        req.session.user = populatedTeacher;
        console.log("req.user", req.user);
        res.status(200).send(newCourse);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  })
);

//show
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const course = await Course.findById(req.params.id).populate(["teacher",'waitlist','students']);
    console.log(course.students)
    if (course) return res.status(200).send(course);
    res.status(400).send({ message: "course not found" });
  })
);

//edit
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const course = Course.findById(id);
    const {
      title,
      description,
      price,
      link,
      type,
      category,
      hours,
      certificate,
      subscribe,
      img,
    } = req.body;
    const { error } = courseEditSchema.validate({
      title,
      description,
      price,
      link,
      type,
      category,
      hours,
      certificate,
      subscribe,
      img,
    });
    if (error) {
      const msg = error.details.map((el) => el.message).join(",");
      res.status(400).send({ message: msg });
    }
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        link,
        type,
        category,
        hours,
        certificate,
        subscribe,
        img,
      },
      { new: true }
    )
    req.session.user= await Teacher.findById(updatedCourse.teacher);
    if (course) return res.status(200).send(updatedCourse);
  })
);

//delete
router.delete("/:id",catchAsync(async (req, res) => {
  //delete course
  //delete course from teacher (middleware?)
  //delete from all students appliedcourses
  //delete from all students enrolledcourses all of this should be with middleware //done
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    req.session.user=await Teacher.findById(course.teacher);
    console.log(req.session.user)
    if (course) return res.status(200).send(course);
    res.status(400).send({ message: "course not found" });
  })
);

router.post(
  "/:id/subscribe",
  catchAsync(async (req, res) => {
    console.log('subscribe')
    const { id } = req.params;
    console.log(id)
    let findId
    if (req.user){
      console.log('user')
      findId = req.user._id
    } else if (req.query.s){
     findId = req.query.s
     console.log('query')
    }else{
      findId = '644fd3c865e878f381a43035'
      console.log('s')
      console.log(findId)
    }
    const student = await Student.findById(findId)
    .catch(err=>{
      res.status(500).send(err.message);
    });    
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { $addToSet: { waitlist: student } },
      { new: true }
    )
    .populate(['waitlist'])
    .catch(err=>{
      res.status(500).send(err.message);
    });   
    const updatedStudent = await Student.findByIdAndUpdate(
      student._id,
      { $addToSet: { appliedCourses: id } },
      { new: true }
    )
    .populate('appliedCourses')
    .catch(err=>{
      res.status(500).send(err.message);
    });
    req.session.user = updatedStudent;
    res.status(200).send({updatedCourse,updatedStudent}); 

  })
);

//it must be an admin
router.post("/:id/confirm", async (req, res) => {
  console.log('confirm')
  //add student to course student
  //remove student from waitlist
  //add course to student enroll
  //remove course from applied
  //add teacher to student's teachers
  const { id } = req.params;
  const student = await Student.findById(req.query.s)
  .catch(err=>{
    res.status(500).send(err.message);
  });
  console.log(student)
  if(!(student.appliedCourses.includes(id))) return res.status(400).send({message:"the student is not in the waitlist"})
  const updatedCourse = await Course.findByIdAndUpdate(
    id,
    { $pull: { waitlist: student._id }, $addToSet: { students: student } },
    { new: true }
  )
  .catch(err=>{
    res.status(500).send(err.message);
  });
  console.log(updatedCourse)
  const updatedStudent = await Student.findByIdAndUpdate(
    student._id,
    {
      $pull: { appliedCourses: id },
      $addToSet: { enrolledCourses: updatedCourse ,teachers: updatedCourse.teacher  },
    },
    { new: true }
  )
  .populate('enrolledCourses')
  .catch(err=>{
    res.status(500).send(err.message);
  });
  res.status(200).send({updatedCourse,updatedStudent});

});

router.delete(
  "/:id/subscribe",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const student = await Student.findById(req.query.s)
    .catch(err=>{
      res.status(500).send(err.message);
    });
    //delete student from waitlist
    //delete course from appliedcourses

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { $pull: { waitlist: student._id } },
      { new: true }
    )
    .catch(err=>{
      res.status(500).send(err.message);
    });

    const updatedStudent = await Student.findByIdAndUpdate(
      student._id,
      { $pull: { appliedCourses: id } },
      { new: true }
    )
    .catch(err=>{
      res.status(500).send(err.message);
    });

    req.session.user = updatedStudent;
    res.status(200).send(updatedCourse);
  })
);

router.delete('/:id/confirm',catchAsync(async (req,res)=>{
  const { id } = req.params;
  const student = await Student.findById(req.query.s)
  .catch(err=>{
    res.status(500).send(err.message);
  });

  //delete course from student courses
  //delete teacher from student
  //delete student from course student

  const updatedCourse = await Course.findByIdAndUpdate(
    id,
    { $pull: { students: student._id } },
    { new: true }
  )
  .catch(err=>{
    res.status(500).send(err.message);
  });

  const updatedStudent = await Student.findByIdAndUpdate(
    student._id,
    { $pull: { enrolledCourses: id , teacher:updatedCourse.teacher } },
    { new: true }
  )
  .catch(err=>{
    res.status(500).send(err.message);
  });

  req.session.user = updatedStudent;
  res.status(200).send(updatedCourse);
}));

module.exports = router;
