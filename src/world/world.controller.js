const worldService = require('./world.service');
const { ELEMENT_TYPES } = require('./constants/base-values');

module.exports = {
  async initializeWorld(req, res) {
    try {
      const world = await worldService.initializeWorld();
      res.json(world);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async tickWorld(req, res) {
    try {
      const world = await worldService.tickWorld();
      res.json(world);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getWorldState(req, res) {
    try {
      const world = await worldService.getWorldState();
      if (!world) return res.status(404).json({ error: 'World not initialized' });
      res.json(world);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getElementDecayInfo(req, res) {
    try {
      const { element } = req.params;
      if (!ELEMENT_TYPES.includes(element)) {
        return res.status(400).json({ error: 'Invalid element type' });
      }
      const info = await worldService.getElementDecayInfo(element);
      res.json(info);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllDecayRates(req, res) {
    try {
      const rates = {};
      for (const element of ELEMENT_TYPES) {
        rates[element] = await worldService.getElementDecayInfo(element);
      }
      res.json(rates);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};