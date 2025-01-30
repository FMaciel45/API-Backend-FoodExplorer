const { Router } = require("express");
const multer = require("multer");

const DishesController = require("../controllers/DishesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const uploadConfig = require("../configs/upload");

const dishesRoutes = Router();
const dishesController = new DishesController();

const uploadImage = multer(uploadConfig.MULTER);

dishesRoutes.use(ensureAuthenticated);

// Aplicando multer para processar o upload da imagem corretamente
dishesRoutes.post("/", uploadImage.single("image"), dishesController.create);
dishesRoutes.put("/:id", uploadImage.single("image"), dishesController.update);

dishesRoutes.delete("/:id", dishesController.delete);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.get("/", dishesController.index);

module.exports = dishesRoutes;
