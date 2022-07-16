const Task = require("../models/Task");

const getAll = async (req, res) => {

    try {
        let tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({error: 'Não foi possível encontrar as tasks. Atualize a página para tentar novamente.'});
    }

}

const addTask = (req, res) => {

    let task = new Task({ task: req.body.task });

    task.save().then(doc => {
        res.json(doc);
    }).catch(err => {
        res.status(500).json({error: 'Não foi possível salvar a task'});
    });

}

const editTask = async (req, res) => {

    let id = req.body.id;
    let newText = req.body.newText;

    try {
        let doc = await Task.findByIdAndUpdate(id, { task: newText });
        res.json(doc);
    } catch (err) {
        res.status(500).json({error: 'Não foi possível atualizar a task'});
    }

}

const checkTask = async (req, res) => {

    let id = req.params.id;

    let doc = await Task.findById(id);

    try {
        let newDoc = await Task.findByIdAndUpdate(id, { $set: { checked: !doc.checked } });
        res.json(newDoc);
    } catch (err) {
        res.status(500).json({error: 'Não foi possível atualizar o check da task'});
    }

}

const removeTask = async (req, res) => {

    let id = req.params.id;

    try {
        let doc = await Task.findByIdAndDelete(id);
        res.json(doc);
    } catch (err) {
        res.status(500).json({error: 'Não foi possível apagar a task'});
    }

}

module.exports = { getAll, addTask, editTask, checkTask, removeTask }