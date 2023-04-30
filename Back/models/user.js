const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: String,
    googleId: String,
    email:String,
    role: {
        type: String,
        enum: ['super admin','admin', 'teacher', 'student'],
    },
    img:String,
    phone:String,
},
    { timestamps: true }
);

const teacherSchema = new Schema({
    courses:{
        type : [{
            type : Schema.Types.ObjectId , 
            ref: 'Course'
        }] , 
    },
    description:String,
    subjects:{
        type : [{
            type : String , 
        }] , 
    },
});

const studentSchema = new Schema({
    appliedCourses:{
        type : [{
            type : Schema.Types.ObjectId , 
            ref: 'Course'
        }] , 
    },
    enrolledCourses:{
        type : [{
            type : Schema.Types.ObjectId , 
            ref: 'Course'
        }] , 
    },
    teachers: {
        type:[{
            type:Schema.Types.ObjectId,
            ref:'Teacher'
        }]
    },
    academicLevel:String,
    address:String,
    dateOfBirth:Date,
});


const adminSchema = new Schema({

})


const User = mongoose.model('User', userSchema);
const Student = User.discriminator('Student', studentSchema);
const Teacher = User.discriminator('Teacher', teacherSchema);
const Admin = User.discriminator('Admin',adminSchema);

module.exports = {User,Student,Teacher,Admin};