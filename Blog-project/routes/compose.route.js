const express = require('express');

var controller = require('../controllers/compose.controller');
var validate = require('../validate/compose.validate');

const router = express.Router();

router.get("/", controller.index);
  
router.post("/", validate.create ,controller.create);

module.exports = router;