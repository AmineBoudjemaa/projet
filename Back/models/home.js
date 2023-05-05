const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const homeTeacherSchema = new Schema({
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
      }
})

const homeImgSchema = new Schema({
    img:String,
    link:String,
})

const HomeTeacher = mongoose.model('HomeTeacher',homeTeacherSchema);
const HomeImg = mongoose.model('homeImg',homeImgSchema);
module.exports = {HomeTeacher,HomeImg};
