const User = require("./User");
const Product = require("./Product");
const Customer = require("./Customer");
const Order = require("./Order");
const OrderItem = require("./OrderItem");
const Sale = require("./Sale");

Customer.hasMany(Order, {
  foreignKey: "customer_id"
});

Order.belongsTo(Customer, {
  foreignKey: "customer_id"
});

Order.hasMany(OrderItem, {
  foreignKey: "order_id"
});

OrderItem.belongsTo(Order, {
  foreignKey: "order_id"
});

Product.hasMany(OrderItem, {
  foreignKey: "product_id"
});

OrderItem.belongsTo(Product, {
  foreignKey: "product_id"
});

Order.hasOne(Sale, {
  foreignKey: "order_id"
});

Sale.belongsTo(Order, {
  foreignKey: "order_id"
});

module.exports = {
  User,
  Product,
  Customer,
  Order,
  OrderItem,
  Sale
};