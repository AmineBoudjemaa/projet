const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homeSchema = new Schema({
    teachers: {
        type:[{
            type:Schema.Types.ObjectId,
            ref:'Teacher'
        }]
    },
    imgs: {
        type:[{
            type:String,
        }]
    },
});

const Homepage = mongoose.model('Homepage',homeSchema);
module.exports = Homepage;
