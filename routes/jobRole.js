const app = require('../app');
const controller = require('../controllers/jobRole');
const express = require('express');
const router = express.Router();

router.get('/', controller.getAll);

module.exports = router;