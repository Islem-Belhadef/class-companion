const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const justificationSchema = new Schema({
    date : {
        type: Date,
        required: true,
    },
    time : {
        type: String,
        required: true,
    },
    link : {
        type: String,
        required: true,
    },
    absence_id : {
        type: String,
        required: true,
    },

}, { timestamps: true });

const Justification = mongoose.model('Justification', justificationSchema);
module.exports = Justification;