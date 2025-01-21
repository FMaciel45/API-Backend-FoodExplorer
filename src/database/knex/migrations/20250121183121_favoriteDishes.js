exports.up = knex => knex.schema.createTable("favoriteDishes", table => {
  table.increments("id");
  table.integer("userId").notNullable().references("id").inTable("users").onDelete("CASCADE");
  table.integer("dishId").notNullable().references("id").inTable("dishes").onDelete("CASCADE");
});

exports.down = knex => knex.schema.dropTable("favoriteDishes");