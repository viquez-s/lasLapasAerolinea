const express = require("express");
const router = express.Router();
const controller = require("../controllers/routeController");

//Autenticación para el uso del API
const auth = require("../middleware/auth");
const { permit } = require("../middleware/authorization");

//Definición de rutas para cada uno de los verbos para los post
//router.get("/", auth, permit("admin"), postController.get);
router.get("/", auth, controller.get);

router.get("/:id", auth, controller.getById);

router.post("/", controller.create);

router.delete("/:id", controller.delete);

router.put("/:id", controller.update);

module.exports = router;