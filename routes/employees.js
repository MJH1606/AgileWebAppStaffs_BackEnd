const express = require('express');
const router = express.Router();
const controller = require('../controllers/employees'); 

router.get('/', controller.getAll);
router.get('/jobrole/:role', controller.getByJobRole);
router.get('/name/:firstName/:surname', controller.getByName); 
router.get('/:id', controller.getById); 


// router.get('/desc/:value', controller.getByDesc);
// router.post('/', controller.create);
// router.delete('/', controller.deleting);
// router.put('/', controller.update);

module.exports = router;
