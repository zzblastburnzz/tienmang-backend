const WorldState = require('./world-state.model');
const { 
  ELEMENT_TYPES,
  ELEMENT_HALF_LIVES,
  INITIAL_ELEMENTS,
  INITIAL_REGEN_RATES,
  MIN_REGEN_RATES
} = require('./constants/base-values');

exports.initializeWorld = async (req, res) => {
  try {
    const exists = await WorldState.findOne();
    if (exists) return res.status(400).json({ message: 'World already initialized.' });

    const initialHistory = {};
    ELEMENT_TYPES.forEach(element => {
      initialHistory[element] = [INITIAL_ELEMENTS[element]];
    });

    const world = new WorldState({
      totalElements: { ...INITIAL_ELEMENTS },
      availableElements: { ...INITIAL_ELEMENTS },
      totalLinhKhi: INITIAL_ELEMENTS.Linh,
      availableLinhKhi: INITIAL_ELEMENTS.Linh,
      elementHistory: initialHistory,
      elementHalfLives: { ...ELEMENT_HALF_LIVES }
    });

    const savedWorld = await world.save();
    res.json(savedWorld);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function calculateElementRegenRate(element, worldAge) {
  const halfLife = ELEMENT_HALF_LIVES[element];
  const initialRate = INITIAL_REGEN_RATES[element];
  const minRate = MIN_REGEN_RATES[element];

  const halfLifeCycles = worldAge / halfLife;
  const currentRate = initialRate * Math.pow(0.5, halfLifeCycles);
  
  return Math.max(currentRate, minRate);
}

exports.tickWorld = async (req, res) => {
  try {
    const world = await WorldState.findOne();
    if (!world) return res.status(404).json({ message: 'World not initialized.' });

    world.age += 1;

    for (const element of ELEMENT_TYPES) {
      const currentRegenRate = calculateElementRegenRate(element, world.age);
      const regenAmount = world.totalElements[element] * currentRegenRate;
      world.availableElements[element] += regenAmount;
      
      if (!world.regenHistory) world.regenHistory = {};
      world.regenHistory[element] = world.regenHistory[element] || [];
      world.regenHistory[element].push({
        tick: world.age,
        rate: currentRegenRate,
        amount: regenAmount
      });
      
      if (world.regenHistory[element].length > 100) {
        world.regenHistory[element].shift();
      }
    }

    await world.save();
    res.json(world);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getWorldState = async (req, res) => {
  try {
    const world = await WorldState.findOne();
    if (!world) return res.status(404).json({ message: 'World not initialized.' });
    res.json(world);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getElementDecayInfo = async (req, res) => {
  try {
    const { element } = req.params;
    if (!ELEMENT_TYPES.includes(element)) {
      return res.status(400).json({ error: 'Invalid element type' });
    }

    const world = await WorldState.findOne();
    if (!world) return res.status(404).json({ message: 'World not initialized.' });

    const currentRate = calculateElementRegenRate(element, world.age);
    const nextRate = calculateElementRegenRate(element, world.age + 1);
    
    res.json({
      element,
      currentRate,
      nextRate,
      halfLife: ELEMENT_HALF_LIVES[element],
      age: world.age,
      progress: (world.age / ELEMENT_HALF_LIVES[element]) * 100,
      nextHalving: ELEMENT_HALF_LIVES[element] - (world.age % ELEMENT_HALF_LIVES[element]),
      minRate: MIN_REGEN_RATES[element]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllDecayRates = async (req, res) => {
  try {
    const world = await WorldState.findOne();
    if (!world) return res.status(404).json({ message: 'World not initialized.' });

    const rates = {};
    for (const element of ELEMENT_TYPES) {
      const currentRate = calculateElementRegenRate(element, world.age);
      rates[element] = {
        currentRate,
        halfLife: ELEMENT_HALF_LIVES[element],
        progress: (world.age / ELEMENT_HALF_LIVES[element]) * 100
      };
    }

    res.json(rates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};