const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const absenceSchema = new Schema({
    date : {
        type: Date,
        required: true,
    },
    time : {
        type: String,
        required: true,
    },
    student_id : {
        type: String,
        required: true,
    },
    teacher_id : {
        type: String,
        required: true,
    },
    class_id : {
        type: String,
        required: true,
    },
    class_type : {
        type: String,
        required: true,
    },
    nature : {
        type: String,
        required: true,
    }

}, { timestamps: true });

const Absence = mongoose.model('Absence', absenceSchema);
module.exports = Absence;