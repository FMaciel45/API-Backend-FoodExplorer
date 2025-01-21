const knex = require("../database/knex");

const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishesController {

  async create(request, response) {
    const {name, category, price, description, ingredients} = request.body
    //const imageFileName = request.file.filename

    const dishAlreadyExists = await knex("dishes").where({name}).first()

    if(dishAlreadyExists) {
      throw new AppError("Prato já existente no cardápio!")
    }

    const diskStorage = new DiskStorage()

    //const filename = await diskStorage.saveFile(imageFileName)

    const newDish = {name, category, price, description}

    const [dishId] = await knex("dishes").insert(newDish)

    const ingredientsList = ingredients.map((ingredient) => ({dishId, name: ingredient}))

    if(ingredientsList.length > 0) {
      await knex("ingredients").insert(ingredientsList)
    }

    return response.status(201).json()
  }

  async delete(request, response) {
    const {id} = request.params

    await knex("dishes").where({id}).delete()

    return response.status(202).json() // 202 ->  
  }

  async update(request, response) {
    const {name, category, price, description, ingredients} = request.body
    const {id} = request.params
    //const imageFileName = request.file.filename 

    const dishExists = await knex("dishes").where({id}).first()

    if(!dishExists) {
      throw new AppError("Prato não encontrado!", 404)
    }

    //const diskStorage = new DiskStorage()

    const dish = await knex("dishes").where({id}).first()

    /*if(dish.image) {
      await diskStorage.deleteFile(dish.image)
    }*/

    //const filename = await diskStorage.saveFile(imageFileName)

    const updatedDish = {
      //image: image ?? dishExists.filename;
      name: name ?? dishExists.name,
      category: category ?? dishExists.category,
      price: price ?? dishExists.price,
      description: description ?? dishExists.description,
    }

    try {
      await knex("dishes").where({id}).update(updatedDish)

      await knex("ingredients").where({dishId: id}).delete()

      if(ingredients && ingredients.length > 0) {
        const ingredientsList = ingredients.map((ingredient) => ({dishId: id, name: ingredient}))

        await knex("ingredients").insert(ingredientsList)
      }

      return response.status(200).json("Prato atualizado com sucesso!")

    } catch(error) {
      console.log(error)
      throw new AppError("Erro ao atualizar prato!")
    }
  }

  async show(request, response) { // busca detalhes de um prato específico
    const {id} = request.params

    const dish = await knex("dishes").where({id}).first()
    const ingredients = await knex("ingredients").where({dishId: id}).orderBy("name")

    return response.status(201).json({
      ...dish,
      ingredients
    })
  }

  async index(request, response) { // lista todos os pratos e seus ingredientes
    const {name, ingredients} = request.query

    let dishes
    
    if(ingredients) {
      const ingredientsFilter = ingredients.split(",").map(ingredient => ingredient.trim().toLowerCase())

      dishes = await knex("ingredients").select([
        "dishes.id",
        "dishes.image",
        "dishes.name",
        "dishes.category",
        "dishes.price",
        "dishes.description",
      ])
      .whereLike("dishes.name", `%${name}%`)
      .whereIn("name", ingredientsFilter)
      .innerJoin("dishes", "dishes.id", "ingredients.dishId")
      .groupBy("dishes.id")
      .orderBy("dishes.name")
   
    } else {
      dishes = await knex("dishes").orderBy("name")
    }

    const Ingredients = await knex("ingredients") 
    
    const dishesWithIngredients = dishes.map(dish => {
      const dishIngredient = Ingredients.filter(ingredient => ingredient.dishId === dish.id)

      return {
        ...dish, // ... = spread operator -> pega todas as propriedades de "dish"
        ingredients: dishIngredient
      }
    })

    return response.status(200).json(dishesWithIngredients)
  }
}

module.exports = DishesController