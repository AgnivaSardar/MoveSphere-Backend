const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const InventoryItem = require('./InventoryItem');

const Hangar = sequelize.define('Hangar', {
  hangarId: { type: DataTypes.STRING, primaryKey: true, field: 'hangar_id' },
  location: DataTypes.STRING,
  capacity: DataTypes.INTEGER,
  hangarType: { type: DataTypes.STRING, field: 'hangar_type' },
}, {
  tableName: 'hangars',
  timestamps: false,
});

// Associations
Hangar.hasMany(InventoryItem, { foreignKey: 'locationId', sourceKey: 'hangarId' });

module.exports = Hangar;
