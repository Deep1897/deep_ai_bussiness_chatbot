const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Sale = sequelize.define(
  "Sale",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    total: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: "sales",
    timestamps: false
  }
);

module.exports = Sale;