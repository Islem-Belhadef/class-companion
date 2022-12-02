const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherModulesSchema = new Schema({
    teacherId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    speciality:{
        type: String,
        required: true,
    },

});
const TeacherModules = mongoose.model('TeacherModules', teacherModulesSchema);
module.exports = TeacherModules;