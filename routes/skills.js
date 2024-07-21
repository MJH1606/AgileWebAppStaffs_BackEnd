const app = require('../app');
const controller = require('../controllers/skills');
const express = require('express');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/name/:value', controller.getByName);
router.get('/category/:category', controller.getByCategory);
router.post('/', controller.create);
router.delete('/',controller.deleting);
router.put('/', controller.update);

module.exports = router;