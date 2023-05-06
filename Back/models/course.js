const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Student} = require('./user');
const catchAsync = require('../utils/catchAsync')

const courseSchema = new Schema({
    title:String,
    description:String,
    link:String,
    plan:String,
    img:String,
    category:String,//should be enum
    type: {
        type: String,
        enum: ['on site','online'],
    },
    price:Number,
    hours:Number,
    certificate:Boolean,
    subscribe:Boolean,
    students:{
        type : [{
            type : Schema.Types.ObjectId , 
            ref: 'Student'
        }] , 
    },
    waitlist:{
        type : [{
            type : Schema.Types.ObjectId , 
            ref: 'Student'
        }] ,
    },
    teacher:{ type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
});


courseSchema.post('findOneAndDelete',
    async function(data) {
    console.log('post',data)
    const studentIds = data.students.concat(data.waitlist);

    if(data.students.length){
    const updatedStudent = await Student.updateMany(
      { _id: { $in: studentIds } },
      { $pull: { enrolledCourses: data._id, appliedCourses: data._id } }
    );
    }
    
  }
) ;

const course = mongoose.model('Course',courseSchema);
module.exports = course;
