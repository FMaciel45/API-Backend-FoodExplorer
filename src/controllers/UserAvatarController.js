const knex = require("../database/knex");

const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class UserAvatarController {

  async update(request, response) {
    const userId = request.user.id
    const avatarFileName = request.file.filename

    const diskStorage = new DiskStorage()

    const user = await knex("users").where({id: userId}).first()

    if(!user) {
      throw new AppError("Somente usuários autenticados podem mudar o avatar", 401)
    }

    if(user.avatar) {
      await diskStorage.deleteFile(user.avatar)
    }

    const filename = await diskStorage.saveFile(avatarFileName)

    user.avatar = filename

    await knex("users")
    .update({ avatar: filename, updatedAt: knex.fn.now() })
    .where({ id: userId })
  
    return response.json(user)
  }
}

module.exports = UserAvatarController