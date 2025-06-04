const WorldState = require('../models/world-state.model');
const { INITIAL_ELEMENTS, INITIAL_LINH_KHI, GAS_REGEN_RATE } = require('../constants/base-values');

exports.initWorld = async (req, res) => {
  const exists = await WorldState.findOne();
  if (exists) return res.status(400).json({ message: 'World already initialized.' });

  const world = new WorldState({
    age: 0,
    totalElements: { ...INITIAL_ELEMENTS },
    availableElements: { ...INITIAL_ELEMENTS },
    totalLinhKhi: INITIAL_LINH_KHI,
    availableLinhKhi: INITIAL_LINH_KHI,
    stability: 100,
  });

  await world.save();
  res.json(world);
};

exports.tickWorld = async (req, res) => {
  const world = await WorldState.findOne();
  if (!world) return res.status(404).json({ message: 'World not initialized.' });

  world.age += 1;

  for (const key of Object.keys(world.availableElements)) {
    const regen = world.totalElements[key] * GAS_REGEN_RATE;
    world.availableElements[key] += regen;
  }

  const linhRegen = world.totalLinhKhi * GAS_REGEN_RATE;
  world.availableLinhKhi += linhRegen;

  const elements = Object.values(world.availableElements);
  const avg = elements.reduce((a, b) => a + b, 0) / elements.length;
  const deviation = elements.reduce((sum, val) => sum + Math.abs(val - avg), 0);
  world.stability = Math.max(0, 100 - deviation / (avg * 0.1));

  await world.save();
  res.json(world);
};

exports.getWorldState = async (req, res) => {
  const world = await WorldState.findOne();
  if (!world) return res.status(404).json({ message: 'World not initialized.' });
  res.json(world);
};
