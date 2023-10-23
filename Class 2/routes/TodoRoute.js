const express = require("express");
const router = express.Router();

const {createTodo} = require("../controller/createTodo");
const {getAllTodo} = require("../controller/getAllTodo");
const {getOneTodo} = require("../controller/getOneTodo");
const {updateTodo} = require("../controller/updateTodo");
const {deleteTodo} = require("../controller/deleteTodo");

router.post('/createTodo', createTodo);
router.get('/getTodos', getAllTodo);
router.get('/getTodos/:id', getOneTodo);
router.put('/updateTodo/:id', updateTodo);
router.delete('/deleteTodo/:id', deleteTodo);

module.exports = router;