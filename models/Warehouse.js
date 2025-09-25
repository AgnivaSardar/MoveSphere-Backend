const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const InventoryItem = require('./InventoryItem');

const Warehouse = sequelize.define('Warehouse', {
  warehouseId: { type: DataTypes.STRING, primaryKey: true, field: 'warehouse_id' },
  location: DataTypes.STRING,
  capacity: DataTypes.INTEGER,
}, {
  tableName: 'warehouses',
  timestamps: false,
});

Warehouse.hasMany(InventoryItem, { foreignKey: 'locationId', sourceKey: 'warehouseId' });

module.exports = Warehouse;
