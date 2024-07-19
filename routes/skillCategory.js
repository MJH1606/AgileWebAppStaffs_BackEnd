const app = require('../app');
const controller = require('../controllers/skillCategory');
const express = require('express');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/category/:category', controller.getByCategory);
//router.get('/desc/:value', controller.getByDesc);

router.post('/', controller.create);
router.delete('/', controller.deleting);
router.put('/', controller.update);

module.exports = router;