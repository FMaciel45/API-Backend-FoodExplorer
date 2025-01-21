const {Router} = require("express");
//const multer = require("multer");

const DishesController = require("../controllers/DishesController");
//const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
//const uploadConfig = require("../configs/upload");

const dishesRoutes = Router()

const dishesController = new DishesController()

//const uploadImage = multer(uploadConfig.MULTER)

dishesRoutes.post("/", dishesController.create)
dishesRoutes.delete("/:id", dishesController.delete)
dishesRoutes.put("/:id", dishesController.update)
dishesRoutes.get("/:id", dishesController.show)
dishesRoutes.get("/", dishesController.index);

module.exports = dishesRoutes
