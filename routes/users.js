var express = require('express');
var router = express.Router();
const usersController = require("../controllers/users.js")

/* GET users listing. */

router.get("/", usersController.all)
router.post("/", usersController.create)
router.get("/:id", usersController.findOne)
router.patch("/:id", usersController.update)

module.exports = router;