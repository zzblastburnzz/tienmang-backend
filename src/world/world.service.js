const WorldState = require('./world-state.model');
const {
  ELEMENT_TYPES,
  ELEMENT_HALF_LIVES,
  INITIAL_ELEMENTS,
  INITIAL_REGEN_RATES,
  MIN_REGEN_RATES,
  STABILITY_THRESHOLDS
} = require('./constants/base-values');

class WorldService {
  calculateElementRegenRate(element, worldAge) {
    const halfLife = ELEMENT_HALF_LIVES[element];
    const initialRate = INITIAL_REGEN_RATES[element];
    const minRate = MIN_REGEN_RATES[element];

    const halfLifeCycles = worldAge / halfLife;
    const currentRate = initialRate * Math.pow(0.5, halfLifeCycles);
    
    return Math.max(currentRate, minRate);
  }

  async initializeWorld() {
    const exists = await WorldState.findOne();
    if (exists) throw new Error('World already initialized');

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

    return world.save();
  }

  async tickWorld() {
    const world = await WorldState.findOne();
    if (!world) throw new Error('World not initialized');

    world.age += 1;

    // Phục hồi nguyên tố với tỷ lệ riêng
    for (const element of ELEMENT_TYPES) {
      const currentRegenRate = this.calculateElementRegenRate(element, world.age);
      const regenAmount = world.totalElements[element] * currentRegenRate;
      world.availableElements[element] += regenAmount;
      
      // Ghi nhận lịch sử phục hồi
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

      // Cập nhật lịch sử nguyên tố
      world.elementHistory[element] = world.elementHistory[element] || [];
      world.elementHistory[element].push(world.availableElements[element]);
      if (world.elementHistory[element].length > 100) {
        world.elementHistory[element].shift();
      }
    }

    // Tính toán độ ổn định
    const elements = ELEMENT_TYPES.map(e => world.availableElements[e]);
    const avg = elements.reduce((a, b) => a + b, 0) / elements.length;
    const deviation = elements.reduce((sum, val) => sum + Math.abs(val - avg), 0);
    world.stability = Math.max(0, STABILITY_THRESHOLDS.MAX - deviation / (avg * 0.1));

    // Cập nhật trạng thái ổn định
    if (world.stability < STABILITY_THRESHOLDS.CRITICAL) {
      world.stabilityStatus = 'critical';
    } else if (world.stability < STABILITY_THRESHOLDS.WARNING) {
      world.stabilityStatus = 'unstable';
    } else {
      world.stabilityStatus = 'stable';
    }

    return world.save();
  }

  async getWorldState() {
    return WorldState.findOne();
  }

  async getElementDecayInfo(element) {
    const world = await WorldState.findOne();
    if (!world) throw new Error('World not initialized');

    const currentRate = this.calculateElementRegenRate(element, world.age);
    const nextRate = this.calculateElementRegenRate(element, world.age + 1);
    
    return {
      element,
      currentRate,
      nextRate,
      halfLife: ELEMENT_HALF_LIVES[element],
      age: world.age,
      progress: (world.age / ELEMENT_HALF_LIVES[element]) * 100,
      nextHalving: ELEMENT_HALF_LIVES[element] - (world.age % ELEMENT_HALF_LIVES[element]),
      minRate: MIN_REGEN_RATES[element]
    };
  }

  async consumeElements(elements) {
    const world = await WorldState.findOne();
    if (!world) throw new Error('World not initialized');

    for (const [element, amount] of Object.entries(elements)) {
      if (world.availableElements[element] < (amount || 0)) {
        throw new Error(`Not enough ${element} element`);
      }
    }

    for (const [element, amount] of Object.entries(elements)) {
      world.availableElements[element] -= amount || 0;
    }

    world.totalEntities += 1;
    return world.save();
  }
}

module.exports = new WorldService();