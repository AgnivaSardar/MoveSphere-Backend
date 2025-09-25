const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

require('dotenv').config();


// Import your models here
const Hangar = require('./models/Hangar');
const Harbour = require('./models/Harbour');
const Vehicle = require('./models/Vehicle');
const InventoryItem = require('./models/InventoryItem');
const Customer = require('./models/Customer');
const Order = require('./models/Order');
const Warehouse = require('./models/Warehouse');
const Vendor = require('./models/Vendor');
const Employee = require('./models/Employee');

const complianceRoutes = require('./routes/compliance');
const biddingRoutes = require('./routes/bidding');
const chatRoutes = require('./routes/chat');

const createCrudRoutes = require('./routes/crudRoutes');

const models = {
  Hangar,
  Harbour,
  Vehicle,
  InventoryItem,
  Customer,
  Order,
  Warehouse,
  Vendor,
  Employee
};

const app = express();
app.use(cors());
app.use(express.json());

// Register the generic CRUD router
app.use(createCrudRoutes(models));

app.use('/api/compliance', complianceRoutes);
app.use('/api/bidding', biddingRoutes);
app.use('/api/chat', chatRoutes);



const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.error('Unable to connect to DB:', error);
  }
}

startServer();


// A sample API route
app.get('/api/message', (req, res) => {
  res.json({ message: "Hello from Express backend!" });
});


module.exports = app;
