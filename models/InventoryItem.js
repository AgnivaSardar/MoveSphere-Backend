const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const InventoryItem = sequelize.define('InventoryItem', {
  itemId: { type: DataTypes.STRING, primaryKey: true, field: 'item_id' },
  description: DataTypes.STRING,
  quantity: DataTypes.INTEGER,
  reorderThreshold: { type: DataTypes.INTEGER, field: 'reorder_threshold' },
}, {
  tableName: 'inventory_items',
  timestamps: false,
});

module.exports = InventoryItem;
