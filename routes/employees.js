const express = require('express');
const router = express.Router();
const controller = require('../controllers/employees'); 

router.get('/', controller.getAll);
 KAN-40---Get-USER-by-ID
router.get('/:id', controller.getById);
//router.get('/desc/:value', controller.getByDesc);
//router.get('/:id', controller.getById);

//router.post('/', controller.create);
//router.delete('/',controller.deleting);
//router.put('/', controller.update);
=======
router.get('/jobrole/:role', controller.getByJobRole); 
 main

module.exports = router;
