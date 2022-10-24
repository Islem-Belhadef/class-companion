const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    student_card_num: {
        type: String,
        required: true,
    },
    speciality: {
        type: String,
    },
    group: {
        type: String,
    },

}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;