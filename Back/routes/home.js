const express = require("express");
const router = express.Router();
const {HomeTeacher,HomeImg}  = require("../models/home");
const joi = require("joi");

//utils
const catchAsync = require("../utils/catchAsync");
const AppErr = require("../utils/appErr");
const isLoggedIn = require("../utils/isLoggedIn");
// const isTeacher = require("../utils/isTeacher");
// const isOwner = require("../utils/isOwner");


//add teacher
//delete teacher
//get teachers

//add photo
//delete photo
//get photos

router.get(
  "/teachers",
  catchAsync(async (req, res) => {
    console.log('get teacher')
    await HomeTeacher.find({}).populate(['teacher']).then(teachers=>{
    console.log(teachers)
    if (teachers) return res.status(200).send(teachers);
    res.status(500).send({ message: "something went wrong" });
    });

  })
);

//new course
router.post(
  "/teachers/:id",
  catchAsync(async (req, res) => {
    console.log('post teacher')
    const { id } = req.params;
    const homeTeacher = new HomeTeacher({
      teacher: id
    })
    homeTeacher.save()
    .then((homeTeacher) => {
      console.log('Created HomeTeacher:', homeTeacher);
      res.send(homeTeacher);
    })
    .catch((error) => {
      console.error('Error creating HomeTeacher:', error);
      res.status('500').send({message:error})
    });
  })
);

//delete
router.delete("/teachers/:id",catchAsync(async (req, res) => {
    const { id } = req.params;

    HomeTeacher.deleteOne({teacher : id})
  .then((deletedHomeTeacher) => {
    if (!deletedHomeTeacher) {
      console.error('HomeTeacher not found');
      return res.status(400).send({message:'teacher not found'});
    }
    console.log('Deleted HomeTeacher:', deletedHomeTeacher);
    res.send(deletedHomeTeacher);
  })
  .catch((error) => {
    console.error('Error deleting HomeTeacher:', error);
    res.status('500').send({message:error});
  });
  })
);


module.exports = router;
