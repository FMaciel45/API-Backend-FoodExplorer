const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class UsersValidatedController {

  async index(request, response) { 
    const {user} = request

    const checkUserExists = await knex("users").where({id: user.id})

    if(checkUserExists === 0) {
      throw new AppError("Unauthorized", 401)
    }

    return response.status(200).json()
  }
}

module.exports = UsersValidatedController 