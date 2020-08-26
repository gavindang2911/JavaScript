const express = require('express');
var multer  = require('multer')

var controller = require('../controllers/compose.controller');
var validate = require('../validate/compose.validate');

var upload = multer({ dest: './public/uploads/' })

const router = express.Router();

router.get("/", controller.index);
  
router.post("/",
    upload.single('image'),
    validate.create,
    controller.create
);

module.exports = router;