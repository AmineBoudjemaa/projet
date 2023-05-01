const express = require('express');
const router = express.Router();
const {Student,User} = require('../models/user');
const {studentSchema} = require('../schemas');
const joi = require('joi');

//utils
const catchAsync = require('../utils/catchAsync');
const AppErr = require('../utils/appErr');
const validate = require('../utils/validate');
const isLoggedIn = require('../utils/isLoggedIn');
const isAdmin = require('../utils/isAdmin');
const tC = require('../utils/tC');


//validating middleware
const validateStudent=validate(studentSchema);

// router.get('/test',(req,res)=>{

// })

//show students
router.get('/',catchAsync(async(req,res)=>{
    await Student.find({})
    .then(students=>{
        res.status(200).send(students);
    })
    .catch(err=>{
        return res.status(400).send({err});
    })
}));

//show student
router.get('/:id',catchAsync(async (req, res,) => {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(400).send({message:'not found'});
        }
        res.status(200).send(student);
}));

//edit student
router.put('/:id',catchAsync(async (req, res) => {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id, { ...req.body.student },{new:true});
        if(student){
        res.status(200).send(student);
    }

}));

//delete profile
router.delete('/:id',catchAsync(async (req, res) => {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);
        //delete courses and teachers
        if(student){
            return res.status(200).send(student)
        }
        res.status(400).send({err:'not found'});

}));

module.exports = router;