const knex = require("../database/knex");

class OrdersController {
  async create(request, response) {
    const { components, orderStatus, totalPrice } = request.body;
    const userId = request.user.id;

    // Validação de components
    if (!components || !Array.isArray(components)) {
      return response.status(400).json({ error: "Components must be a valid array." });
    }

    // Inserir a ordem
    const [orderId] = await knex("orders").insert({
      userId,
      orderStatus,
      totalPrice,
    });

    // Preparar itens para inserção
    const insertItems = components.map((component) => {
      return {
        name: component.name,
        quantity: component.quantity,
        dishId: component.id,
        orderId,
      };
    });

    // Inserir os componentes no banco
    await knex("ordersComponents").insert(insertItems);

    return response.status(201).json({ orderId });
  }

  async update(request, response) {
    const { id, orderStatus } = request.body;

    await knex("orders").update({ orderStatus }).where({ id });

    return response.status(201).json();
  }

  async index(request, response) {
    const userId = request.user.id;

    const user = await knex("users").where({ id: userId }).first();

    if (user.customer) {
      const orders = await knex("ordersComponents")
        .where({ userId })
        .select([
          "orders.id",
          "orders.userId",
          "orders.orderStatus",
          "orders.totalPrice",
          "orders.createdAt",
        ])
        .innerJoin("orders", "orders.id", "ordersComponents.orderId")
        .groupBy("orders.id");

      const ordersComponents = await knex("ordersComponents");

      const orderNotEmpty = orders.map((order) => {
        const orderComponent = ordersComponents.filter((component) => component.orderId === order.id);

        return {
          ...order,
          components: orderComponent,
        };
      });

      return response.status(200).json(orderNotEmpty);
    } else {
      const orders = await knex("ordersComponents")
        .select([
          "orders.id",
          "orders.userId",
          "orders.orderStatus",
          "orders.totalPrice",
          "orders.createdAt",
        ])
        .innerJoin("orders", "orders.id", "ordersItems.orderId")
        .groupBy("orders.id");

      const ordersComponents = await knex("ordersComponents");

      const orderNotEmpty = orders.map((order) => {
        const orderComponent = ordersComponents.filter((component) => component.orderId === order.id);

        return {
          ...order,
          components: orderComponent,
        };
      });

      return response.status(200).json(orderNotEmpty);
    }
  }
}

module.exports = OrdersController;
