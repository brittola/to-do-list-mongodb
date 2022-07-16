const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const listControllers = require('../controllers/listControllers');

router.get('/tasks/all', listControllers.getAll);

router.post('/tasks/new', bodyParser.json(), listControllers.addTask);

router.put('/tasks/edit', bodyParser.json(), listControllers.editTask);

router.put('/tasks/check/:id', express.urlencoded({ extended: true }), listControllers.checkTask);

router.delete('/tasks/remove/:id', express.urlencoded({ extended: true }), listControllers.removeTask);

module.exports = router;