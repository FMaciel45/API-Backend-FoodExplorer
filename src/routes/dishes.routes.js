const { Router } = require("express");
const multer = require("multer");

const DishesController = require("../controllers/DishesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const uploadConfig = require("../configs/upload");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const dishesRoutes = Router()
const dishesController = new DishesController()

const uploadImage = multer(uploadConfig.MULTER)

dishesRoutes.use(ensureAuthenticated)

// rotas restritas ao admin

dishesRoutes.post("/", verifyUserAuthorization("admin"), uploadImage.single("image"), dishesController.create)
dishesRoutes.put("/:id", verifyUserAuthorization("admin"), uploadImage.single("image"), dishesController.update)
dishesRoutes.delete("/:id", verifyUserAuthorization("admin"), dishesController.delete)

// rotas para customer e admin

dishesRoutes.get("/:id", dishesController.show)
dishesRoutes.get("/", dishesController.index)

module.exports = dishesRoutes;
