const {verify} = require("jsonwebtoken");

const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next){
  const authHeader = request.headers.authorization

  if(!authHeader){
    throw new AppError("JWT Token não informado", 401)
  }

  const [, token] = authHeader.split(" ")

  try{
    const {sub: userId, role} = verify(token, authConfig.jwt.secret)

    request.user = {
      id: Number(userId),
      role
    }

    return next()

  } catch{
    throw new AppError("JWT Token inválido", 401)
  }
}

module.exports = ensureAuthenticated