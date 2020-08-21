const express = require('express');

var controller = require('../controllers/app.controller');

const router = express.Router();

router.get("/", controller.index);
router.get('/cookie', (req, res, next) => {
    res.cookie('user-id', 12345);
    res.send('Hello');
});

module.exports = router;