const express = require('express');
const db = require('../db');

var controller = require('../controllers/compose.controller')

const router = express.Router();

router.get("/", controller.index);
  
router.post("/", controller.create);

module.exports = router;