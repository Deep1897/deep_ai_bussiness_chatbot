const { Op } = require("sequelize");

const { Product, Customer, Order, OrderItem, Sale } = require("../models");

const executeQuery = async (parsedQuery) => {
  try {
    switch (parsedQuery.intent) {


      case "LOW_STOCK":
        return await Product.findAll({
          where: {
            stock: {
              [Op.lt]: 10,
            },
          },
        });


      case "PRODUCTS_UNDER_PRICE":
        return await Product.findAll({
          where: {
            price: {
              [Op.lt]: parsedQuery.price,
            },
          },
        });



      case "PENDING_ORDERS":
        return await Order.findAll({
          where: {
            status: "pending",
          },

          include: [Customer],
        });



      case "LAST_COMPLETED_ORDERS":
        return await Order.findAll({
          where: {
            status: "completed",
          },

          limit: 10,

          order: [["id", "DESC"]],

          include: [Customer],
        });



      case "CUSTOMERS_BY_CITY":
        return await Customer.findAll({
          where: {
            city: parsedQuery.city,
          },
        });

 

      case "TOTAL_SALES_MONTH":
        const startOfMonth = new Date();

        startOfMonth.setDate(1);

        startOfMonth.setHours(0, 0, 0, 0);

        const total = await Sale.sum("total", {
          where: {
            created_at: {
              [Op.gte]: startOfMonth,
            },
          },
        });

        return {
          totalSales: total || 0,
        };



      case "TOP_CUSTOMERS":
        return await Customer.findAll({
          include: [
            {
              model: Order,
            },
          ],

          limit: 5,
        });



      case "TOP_SELLING_PRODUCTS":
        return await Product.findAll({
          include: [
            {
              model: OrderItem,
            },
          ],

          limit: 5,
        });

     

      default:
        return {
          message: "Unknown Query",
        };
    }
  } catch (error) {
    console.log("Query Error:", error.message);

    throw error;
  }
};

module.exports = executeQuery;
