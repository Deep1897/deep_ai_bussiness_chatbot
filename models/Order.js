const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    total_amount: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },

    status: {
      type: DataTypes.ENUM(
        "pending",
        "completed",
        "cancelled"
      ),
      defaultValue: "pending"
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: "orders",
    timestamps: false
  }
);

module.exports = Order;