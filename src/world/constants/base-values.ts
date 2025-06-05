export const ELEMENT_TYPES = ['Kim', 'Moc', 'Thuy', 'Hoa', 'Tho', 'Linh'] as const;
export type ElementType = typeof ELEMENT_TYPES[number];

export const INITIAL_ELEMENTS: Record<ElementType, number> = {
  Kim: 1.8e49,
  Moc: 1.8e49,
  Thuy: 1.8e49,
  Hoa: 1.8e49,
  Tho: 1.8e49,
  Linh: 1.0e49
};

// Cấu hình chu kỳ bán rã cho từng nguyên tố (tính bằng số tick)
export const ELEMENT_HALF_LIVES: Record<ElementType, number> = {
  Kim: 1.5e9,    // 1.5 tỷ tick
  Moc: 2.0e9,    // 2 tỷ tick
  Thuy: 1.8e9,   // 1.8 tỷ tick
  Hoa: 1.2e9,    // 1.2 tỷ tick
  Tho: 1.6e9,    // 1.6 tỷ tick
  Linh: 1.0e12   // Linh khí tồn tại rất lâu
};

// Tỷ lệ phục hồi ban đầu cho từng nguyên tố
export const INITIAL_REGEN_RATES: Record<ElementType, number> = {
  Kim: 1.2e-22,
  Moc: 1.0e-22,
  Thuy: 1.1e-22,
  Hoa: 1.3e-22,
  Tho: 1.05e-22,
  Linh: 0.5e-22
};

// Tỷ lệ phục hồi tối thiểu
export const MIN_REGEN_RATES: Record<ElementType, number> = {
  Kim: 1e-30,
  Moc: 1e-30,
  Thuy: 1e-30,
  Hoa: 1e-30,
  Tho: 1e-30,
  Linh: 1e-32
};

// Ngưỡng ổn định
export const STABILITY_THRESHOLDS = {
  CRITICAL: 30,
  WARNING: 70,
  MAX: 100
};