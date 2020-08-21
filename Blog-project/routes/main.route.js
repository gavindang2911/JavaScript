const express = require('express');

var controller = require('../controllers/app.controller');
var authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get("/",authMiddleware.requireAuth, controller.index);
router.get('/cookie', (req, res, next) => {
    res.cookie('user-id', 12345);
    res.send('Hello');
});

module.exports = router;