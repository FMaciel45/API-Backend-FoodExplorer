const { Router } = require("express"); 
const multer = require("multer");

const uploadConfig = require("../configs/upload");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const UsersController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController");

const usersRoutes = Router()

const upload = multer(uploadConfig.MULTER)

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()


usersRoutes.post("/", usersController.create) // criar usuário
usersRoutes.put("/", ensureAuthenticated, usersController.update) // atualizar informações do usuário
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update) // atualizar o avatar do usuário

module.exports = usersRoutes