const app = require('../app');
const controller = require('../controllers/systemRole');
const express = require('express');
const router = express.Router();

router.get('/', controller.getAll);

module.exports = router;