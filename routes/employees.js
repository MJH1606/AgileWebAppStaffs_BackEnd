const app = require('../app');
const controller = require('../controllers/employees');
const express = require('express');


const router = express.Router();

router.get('/', controller.getAll);
//router.get('/desc/:value', controller.getByDesc);
//router.get('/:id', controller.getById);

//router.post('/', controller.create);
//router.delete('/',controller.deleting);
//router.put('/', controller.update);

module.exports = router;