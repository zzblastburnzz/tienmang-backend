module.exports = {
  ELEMENT_TYPES: ['Kim', 'Moc', 'Thuy', 'Hoa', 'Tho', 'Linh'],

  INITIAL_ELEMENTS: {
    Kim: 1.8e49,
    Moc: 1.8e49,
    Thuy: 1.8e49,
    Hoa: 1.8e49,
    Tho: 1.8e49,
    Linh: 1.0e49
  },

  ELEMENT_HALF_LIVES: {
    Kim: 1.5e9,
    Moc: 2.0e9,
    Thuy: 1.8e9,
    Hoa: 1.2e9,
    Tho: 1.6e9,
    Linh: 1.0e12
  },

  INITIAL_REGEN_RATES: {
    Kim: 1.2e-22,
    Moc: 1.0e-22,
    Thuy: 1.1e-22,
    Hoa: 1.3e-22,
    Tho: 1.05e-22,
    Linh: 0.5e-22
  },

  MIN_REGEN_RATES: {
    Kim: 1e-30,
    Moc: 1e-30,
    Thuy: 1e-30,
    Hoa: 1e-30,
    Tho: 1e-30,
    Linh: 1e-32
  },

  STABILITY_THRESHOLDS: {
    CRITICAL: 30,
    WARNING: 70,
    MAX: 100
  }
};