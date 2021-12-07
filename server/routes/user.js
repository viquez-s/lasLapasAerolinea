const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");
const controller = require("../controllers/userController");


router.get("/", controller.get);
router.get("/:id", controller.getById);
router.post("/signup", controller.signup);
router.delete("/:id", controller.delete);
router.put("/:id", controller.update);

router.post("/signin", controller.signin);

module.exports = router;
