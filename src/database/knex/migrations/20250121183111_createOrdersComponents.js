exports.up = knex => knex.schema.createTable("ordersComponents", table => {
  table.increments("id");
  table.integer("dishId").references("id").inTable("dishes").onDelete("CASCADE");
  table.integer("orderId").references("id").inTable("orders").onDelete("CASCADE");
  table.integer("quantity"); 
  table.text("name");

  table.timestamp("createdAt").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("ordersComponents");