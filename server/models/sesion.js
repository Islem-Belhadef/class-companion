const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sesionSchema = new Schema({

    teacher_id : {
        type: String,
        required: true,
    },

    sesiondate : {
        type: Date,
        required: true,
    },

    sesiontime : {
        type: String,
        required: true,
    },
   
    class_type : {
        type: String,
        required: true,
    },

    module : {
        type: String,
        required: true,
    },

    group : {
        type: String,
        required: true,
    }

}, { timestamps: true });

const Sesion = mongoose.model('Sesion', sesionSchema);
module.exports = Sesion;