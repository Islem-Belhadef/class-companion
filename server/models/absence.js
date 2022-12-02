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
    class_name : {
        type: String,
        required: true,
    },
    class_type : {
        type: String,
        required: true,
    },
    justified : {
        type: Boolean,
        required: true,
    },
    justification_sent : {
        type: Boolean,
        required: true,
    },

}, { timestamps: true });

const Absence = mongoose.model('Absence', absenceSchema);
module.exports = Absence;