const express = require('express');

const controller = require('../controllers/posts.controller');

const router = express.Router();
router.get("/:postName", controller.index);

module.exports = router;
