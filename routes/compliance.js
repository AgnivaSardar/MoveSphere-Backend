const express = require('express');
const router = express.Router();

// GET compliance steps
router.get('/', (req, res) => {
  const { category, city } = req.query;

  // Dummy example data – replace with real DB queries
  const steps = [
    `Step 1 for ${category} in ${city || 'any city'}`,
    `Step 2 for ${category}`,
    'Step 3: Complete required formalities'
  ];

  res.json({ steps });
});

// POST compliance submission
router.post('/', (req, res) => {
  const { category, city } = req.body;

  // You can process/store compliance data here

  res.json({ message: `Compliance data received for ${category} in ${city || 'any city'}` });
});

module.exports = router;
