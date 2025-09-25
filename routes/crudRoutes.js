const express = require('express');
const router = express.Router();

// Pass the Sequelize models as an argument when registering
const createCrudRoutes = (models) => {
  Object.entries(models).forEach(([modelName, Model]) => {
    const basePath = `/api/${modelName.toLowerCase()}`;

    // GET all
    router.get(basePath, async (req, res) => {
      try {
        const items = await Model.findAll();
        res.json(items);
      } catch (e) {
        res.status(500).json({error: e.message});
      }
    });

    // GET by id (assumes id field is <modelName>_id, update as needed)
    router.get(`${basePath}/:id`, async (req, res) => {
      try {
        const item = await Model.findByPk(req.params.id);
        if (item) res.json(item);
        else res.status(404).json({error: 'Not found'});
      } catch (e) {
        res.status(500).json({error: e.message});
      }
    });

    // POST create
    router.post(basePath, async (req, res) => {
      try {
        const item = await Model.create(req.body);
        res.status(201).json(item);
      } catch (e) {
        res.status(400).json({error: e.message});
      }
    });

    // PUT update
    router.put(`${basePath}/:id`, async (req, res) => {
      try {
        const [updated] = await Model.update(req.body, { where: { [`${modelName.toLowerCase()}_id`]: req.params.id }});
        if (updated) {
          const updatedItem = await Model.findByPk(req.params.id);
          res.json(updatedItem);
        } else res.status(404).json({error: 'Not found'});
      } catch (e) {
        res.status(400).json({error: e.message});
      }
    });

    // DELETE
    router.delete(`${basePath}/:id`, async (req, res) => {
      try {
        const deleted = await Model.destroy({ where: { [`${modelName.toLowerCase()}_id`]: req.params.id }});
        if (deleted) res.json({success: true});
        else res.status(404).json({error: 'Not found'});
      } catch (e) {
        res.status(400).json({error: e.message});
      }
    });
  });

  return router;
};

module.exports = createCrudRoutes;
