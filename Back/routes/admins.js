const express = require('express');
const router = express.Router();
const {Admin,Teacher,Student} = require('../models/user');

//utils
const catchAsync = require('../utils/catchAsync');
const AppErr = require('../utils/appErr');

// //validating middleware
// const validateTeacher=validate(teacherSchema);

router.get('/',catchAsync(async(req,res)=>{
    const admins = await Admin.find();
    if(admins) return res.status(200).send(admins);
    res.status(500).send({err:'no admins found'});
}));

//create admins
router.post('/:id',catchAsync(async (req, res) => {
    const { id } = req.params;
    //remove from students
    //add to teachers
    const student =await Student.findByIdAndDelete(id);//and delete
    const {username,googleId,email,phone}=student;
    const newAdmin = new Admin({username,googleId,email,role:'admin',phone});
    await newAdmin.save();
    if(newAdmin) return res.status(200).send(newAdmin);
    res.status(500).send({err:'err creating admin'});
}));


router.delete('/:id',catchAsync(async (req, res) => {
    const { id } = req.params;
    const deletedAdmin = await Admin.findByIdAndDelete(id);
    console.log(deletedAdmin);
    if(deletedAdmin) return res.status(200).send(deletedAdmin);
    res.status(400).send({err:'user not found'});
}));

module.exports = router;