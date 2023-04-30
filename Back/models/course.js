const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Teacher,Student} = require('./user');

const courseSchema = new Schema({
    title:String,
    description:String,
    link:String,
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
            ref: 'student'
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

courseSchema.pre('remove', async function(next) {
    const teacherId = this.teacher;
    const studentIds = this.students.concat(this.waitlist);
    
    // Update teacher document
    await Teacher.findByIdAndUpdate(
      teacherId,
      { $pullAll: { courses: [this._id] } }
    );
    
    // Update student documents
    await Student.updateMany(
      { _id: { $in: studentIds } },
      { $pull: { enrolledCourses: this._id, appliedCourses: this._id } }
    );
    
    next();
  });

const course = mongoose.model('Course',courseSchema);
module.exports = course;
