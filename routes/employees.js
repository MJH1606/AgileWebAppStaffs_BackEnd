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
router.post('/:id/skills', controller.addSkillToEmployee);
router.get('/:id/skills', controller.getSkillsByEmployeeId);
router.put('/:id/skills/:skill', controller.updateSkillDetails);
router.delete('/:id/skills/:skill', controller.deleteSkillDetails);

module.exports = router;