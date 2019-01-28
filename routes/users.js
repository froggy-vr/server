var express = require('express');
var router = express.Router();
const usersController = require("../controllers/users.js")

/* GET users listing. */

router.get("/", usersController.all)
router.post("/", isLoggedIn, usersController.create)
router.get("/:id", usersController.detail)
router.patch("/:id", isLoggedIn, usersController.update)

module.exports = router;