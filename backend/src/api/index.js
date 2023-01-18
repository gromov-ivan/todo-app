const express = require('express');
const router = express.Router();
const tasks = require('./toDoApi');
const list = require('./listDB');
const connectDB = require('./db') ;

connectDB();

router.use('/tasks', tasks);
router.use('/task/list', list);

module.exports = router;