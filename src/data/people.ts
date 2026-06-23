import type { PersonRow, PersonaId } from '../types';

export const PEOPLE: Record<PersonaId, PersonRow[]> = {
  maya: [
    ['Maya Chen', 'Self', 'Owner', 'Account holder · age 31', '', ''],
    ['Daniel Chen', 'Spouse', 'Beneficiary · POA', 'Primary beneficiary', 'Primary', '100%'],
    ['Evelyn Chen', 'Parent', 'Contingent beneficiary', 'Contingent', 'Contingent', '100%'],
    ['Sarah Lin', 'Professional', 'Banker', 'Northway Bank relationship manager', '', ''],
  ],
  david: [
    ['David Okafor', 'Self', 'Owner', 'Account holder · age 54', '', ''],
    ['Sarah Okafor', 'Spouse', 'Owner · Beneficiary', 'Joint owner · primary beneficiary', 'Primary', '100%'],
    ['Maya Okafor', 'Child', 'Beneficiary · Dependent', 'Age 19 · college', 'Contingent', '50%'],
    ['Liam Okafor', 'Child', 'Beneficiary · Dependent', 'Age 17 · minor', 'Contingent', '50%'],
    ['Robert Vance', 'Professional', 'Attorney', 'Estate counsel — Vance & Cole LLP', '', ''],
    ['Tara Nguyen', 'Professional', 'CPA', 'Tax preparer', '', ''],
  ],
  marcus: [
    ['Marcus Bell', 'Self', 'Owner', 'Account holder · age 41', '', ''],
    ['Jordan Bell', 'Spouse', 'Beneficiary', 'Primary beneficiary', 'Primary', '100%'],
    ['Aria Bell', 'Child', 'Beneficiary · Dependent', 'Age 8', 'Contingent', '100%'],
    ['Priya Shah', 'Professional', 'Advisor', 'Wealth advisor', '', ''],
  ],
  patel: [
    ['Raj Patel', 'Self', 'Owner', 'Account holder · age 49', '', ''],
    ['Priya Patel', 'Spouse', 'Owner · Beneficiary · Trustee', 'Joint owner · primary beneficiary', 'Primary', '100%'],
    ['Aanya Patel', 'Child', 'Beneficiary · Dependent', 'Age 16', 'Contingent', '34%'],
    ['Dev Patel', 'Child', 'Beneficiary · Dependent', 'Age 13', 'Contingent', '33%'],
    ['Kira Patel', 'Child', 'Beneficiary · Dependent · Special needs', 'Age 9 · SNT planning', 'Contingent', '33%'],
    ['Anil Mehta', 'Professional', 'Attorney', 'Business succession counsel', '', ''],
  ],
  eleanor: [
    ['Eleanor Whitfield', 'Self', 'Owner · Grantor', 'Account holder · age 71', '', ''],
    ['Charles Whitfield', 'Child', 'Beneficiary · Trustee', 'Successor trustee', 'Primary', '40%'],
    ['Margaret Whitfield-Reyes', 'Child', 'Beneficiary', 'Primary beneficiary', 'Primary', '40%'],
    ['The Whitfield Family Foundation', 'Other', 'Beneficiary', 'Charitable remainder', 'Primary', '20%'],
    ['4 grandchildren', 'Other', 'Beneficiary', 'Dynasty trust beneficiaries', 'Contingent', '—'],
    ['Diane Foster', 'Professional', 'Attorney', 'Trust & estate counsel — Foster Reed', '', ''],
    ['William Tan', 'Professional', 'Trustee', 'Independent corporate trustee', '', ''],
  ],
};
