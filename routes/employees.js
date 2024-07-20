const express = require('express');
const router = express.Router();
const controller = require('../controllers/employees'); 


router.get('/', controller.getAll);
router.get('/jobrole/:role', controller.getByJobRole);
router.get('/systemrole/:systemRole', controller.getBySystemRole);

router.post('/', controller.createEmployee); 
router.get('/name/:firstName/:surname', controller.getByName); 
router.get('/:id', controller.getById); 
router.put('/update/:id', controller.updateEmployee); 
router.delete('/delete/:id', controller.deleteEmployee); 
router.get('/:id/skills', controller.getSkillsByEmployeeId);


// router.get('/desc/:value', controller.getByDesc);
// router.delete('/', controller.deleting);
// router.put('/', controller.update);

module.exports = router;
