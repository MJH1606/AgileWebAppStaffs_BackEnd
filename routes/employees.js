const express = require('express');
const router = express.Router();
const controller = require('../controllers/employees'); 

router.get('/', controller.getAll);
router.get('/jobrole/:role', controller.getByJobRole); 
router.post('/',controller.createEmployee);

module.exports = router;
