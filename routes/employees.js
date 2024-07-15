const express = require('express');
const router = express.Router();
const controller = require('../controllers/employees');  // Ensure the correct path to the controller

router.get('/', controller.getAll);
router.get('/jobrole/:role', controller.getByJobRole); // Update the route to match the controller

module.exports = router;
