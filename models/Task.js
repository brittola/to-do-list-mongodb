const mongoose = require('mongoose');

let taskSchema = new mongoose.Schema({
    task: { type: String, required: true},
    checked: { type: Boolean, default: false }
});

let Task = mongoose.model('Task', taskSchema);

module.exports = Task;