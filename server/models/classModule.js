const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classModuleSchema = new Schema({
    name : {
        type: String,
        required: true,
    },
    excluded_list : {
        type: List,
    },

}, { timestamps: true });

const ClassModule = mongoose.model('ClassModule', classModuleSchema);
module.exports = ClassModule;