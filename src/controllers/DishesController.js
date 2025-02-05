const knex = require("../database/knex");

const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishesController {

  async create(request, response) {
    const { name, category, price, description, ingredients } = request.body
    const imageFileName = request.file.filename

    const diskStorage = new DiskStorage()

    const checkDishAlreadyExists = await knex("dishes").where({ name }).first()

    if (checkDishAlreadyExists) {
      throw new AppError("Este prato já existe no cardápio.")
    }

    const filename = await diskStorage.saveFile(imageFileName)

    const [dishId] = await knex("dishes").insert({
      image: filename,
      name,
      description,
      price,
      category,
    })

    if (ingredients) {
      const formattedIngredients = (Array.isArray(ingredients) ? ingredients : [ingredients]).map(ingredient => ({
        name: ingredient,
        dishId: dishId,
      }))

      await knex("ingredients").insert(formattedIngredients)
    }

    return response.status(201).json()
  }

  async update(request, response) {
    const { name, description, category, price, ingredients } = request.body
    const { id } = request.params

    const imageFileName = request.file ? request.file.filename : null

    const diskStorage = new DiskStorage()

    const dish = await knex("dishes").where({ id }).first()

    if (!dish) {
      throw new AppError("Prato não encontrado.")
    }

    if (imageFileName) {
      if (dish.image) {
        await diskStorage.deleteFile(dish.image)
      }

      dish.image = await diskStorage.saveFile(imageFileName)
    }

    await knex("dishes").where({ id }).update({
      name: name ?? dish.name,
      description: description ?? dish.description,
      category: category ?? dish.category,
      price: price ?? dish.price,
      image: dish.image,
    })

    if (ingredients) {
      await knex("ingredients").where({ dishId: id }).delete()

      const formattedIngredients = (Array.isArray(ingredients) ? ingredients : [ingredients]).map(ingredient => ({
        name: ingredient,
        dishId: id,
      }))

      await knex("ingredients").insert(formattedIngredients)
    }

    return response.status(200).json({ message: "Prato atualizado com sucesso" })
  }

  async show(request, response) {
    const { id } = request.params

    const dish = await knex("dishes").where({ id }).first()

    if (!dish) {
      throw new AppError("Prato não encontrado.")
    }

    const ingredients = await knex("ingredients").where({ dishId: id }).orderBy("name")

    return response.status(200).json({ ...dish, ingredients })
  }

  async delete(request, response) {
    const { id } = request.params

    await knex("dishes").where({ id }).delete()

    return response.status(202).json({ message: "Prato deletado com sucesso" })
  }

  async index(request, response) {
    const { search } = request.query

    let dishes

    if (search) {
      dishes = await knex("dishes")
        .leftJoin("ingredients", "dishes.id", "ingredients.dishId")
        .where(function () {
          this.whereLike("dishes.name", `%${search}%`)
            .orWhereLike("ingredients.name", `%${search}%`)
        })
        .select("dishes.*")
        .groupBy("dishes.id")
        .orderBy("dishes.name")

    } else {
      dishes = await knex("dishes").orderBy("name")
    }

    const dishesIngredients = await knex("ingredients")

    const dishesWithIngredients = dishes.map(dish => ({
      ...dish,
      ingredients: dishesIngredients.filter(ingredient => ingredient.dishId === dish.id),
    }));

    return response.status(200).json(dishesWithIngredients)
  }
}

module.exports = DishesController