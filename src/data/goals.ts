import type { GoalRow, PersonaId } from '../types';

export const GOALS: Record<PersonaId, GoalRow[]> = {
  maya: [
    ['Emergency', 'Emergency fund', 30000, '2026', 'Must-have', 18600, 400, ''],
    ['Retirement', 'Retirement at 65', 1400000, '2061', 'Must-have', 38200, 520, ''],
    ['Home', 'First-home down payment', 80000, '2029', 'Want', 12500, 350, ''],
    ['Debt payoff', 'Pay off student loans', 26000, '2030', 'Want', 19300, 300, ''],
  ],
  david: [
    ['Retirement', 'Retire at 60 — both', 6500000, '2032', 'Must-have', 2980000, 8500, ''],
    ['Education', 'College — two children', 520000, '2031', 'Must-have', 240000, 2000, 'Maya & Liam'],
    ['Legacy', 'Leave estate to children', 5000000, '2055', 'Want', 3240000, 0, ''],
    ['Major purchase', 'Lake house', 900000, '2030', 'Wish', 120000, 1500, ''],
  ],
  marcus: [
    ['Retirement', 'Financial independence by 55', 5000000, '2046', 'Must-have', 1840000, 6000, ''],
    ['Home', 'Upgrade primary residence', 1500000, '2028', 'Want', 320000, 2500, ''],
    ['Emergency', '12-month reserve', 180000, '2026', 'Must-have', 120000, 1500, ''],
  ],
  patel: [
    ['Retirement', 'Sell practice & retire at 62', 9000000, '2040', 'Must-have', 4200000, 12000, ''],
    ['Education', 'College — three children', 900000, '2034', 'Must-have', 330000, 3000, 'Aanya, Dev & Kira'],
    ['Legacy', 'Multi-generational legacy', 8000000, '2055', 'Want', 5000000, 0, ''],
    ['Charitable', 'Endow a dental scholarship', 1000000, '2038', 'Wish', 150000, 2000, ''],
  ],
  eleanor: [
    ['Legacy', 'Dynasty trust for grandchildren', 25000000, '2045', 'Must-have', 18000000, 0, '4 grandchildren'],
    ['Charitable', 'Foundation — $2M/yr giving', 40000000, '2050', 'Must-have', 12000000, 0, ''],
    ['Estate', 'Minimize estate-tax exposure', 14000000, '2026', 'Must-have', 0, 0, ''],
    ['Major purchase', 'Endow university chair', 5000000, '2030', 'Wish', 1200000, 0, ''],
  ],
};
