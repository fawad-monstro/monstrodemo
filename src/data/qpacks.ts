import type { QPack } from '../types';

export const QPACKS: Record<string, QPack> = {
  household: { title: 'About your household', qs: [
    { id: 'married', q: 'What is your marital status?', type: 'choice', options: ['Single', 'Married', 'Partnered', 'Divorced', 'Widowed'] },
    { id: 'kids', q: 'Do you have any children?', type: 'yesno' },
    { id: 'numkids', q: 'How many children do you have?', type: 'choice', options: ['1', '2', '3', '4+'], depends: { id: 'kids', eq: 'Yes' } },
    { id: 'agesrange', q: 'Are any children under 18?', type: 'yesno', depends: { id: 'kids', eq: 'Yes' } },
    { id: 'college', q: 'Are you saving for their education?', type: 'yesno', depends: { id: 'agesrange', eq: 'Yes' } },
  ]},
  dependents: { title: 'Dependents', qs: [
    { id: 'has', q: 'Do you support any dependents?', type: 'yesno' },
    { id: 'count', q: 'How many dependents?', type: 'choice', options: ['1', '2', '3', '4+'], depends: { id: 'has', eq: 'Yes' } },
    { id: 'special', q: 'Any with special long-term needs?', type: 'yesno', depends: { id: 'has', eq: 'Yes' } },
  ]},
  residence: { title: 'State of residence', qs: [
    { id: 'state', q: 'Which state do you reside in?', type: 'choice', options: ['CA', 'NY', 'IL', 'TX', 'CT', 'FL', 'Other'] },
    { id: 'own', q: 'Do you own your primary home?', type: 'yesno' },
    { id: 'second', q: 'Do you own a second / vacation home?', type: 'yesno', depends: { id: 'own', eq: 'Yes' } },
  ]},
  bracket: { title: 'Tax bracket', qs: [
    { id: 'filing', q: 'What is your filing status?', type: 'choice', options: ['Single', 'Married filing jointly', 'Married filing separately', 'Head of household'] },
    { id: 'rate', q: 'Your marginal federal bracket?', type: 'choice', options: ['12%', '22%', '24%', '32%', '35%', '37%'] },
    { id: 'estimated', q: 'Do you make quarterly estimated payments?', type: 'yesno' },
  ]},
  beneficiaries: { title: 'Beneficiaries', qs: [
    { id: 'named', q: 'Have you named beneficiaries on your accounts?', type: 'yesno' },
    { id: 'primary', q: 'Who is your primary beneficiary?', type: 'text', depends: { id: 'named', eq: 'Yes' } },
    { id: 'contingent', q: 'Have you named a contingent beneficiary?', type: 'yesno', depends: { id: 'named', eq: 'Yes' } },
    { id: 'update', q: 'Any recent life changes that affect them?', type: 'yesno' },
  ]},
  match: { title: 'Employer 401(k) match', qs: [
    { id: 'has', q: 'Does your employer match contributions?', type: 'yesno' },
    { id: 'pct', q: 'Up to what percent do they match?', type: 'choice', options: ['3%', '4%', '5%', '6%+'], depends: { id: 'has', eq: 'Yes' } },
    { id: 'current', q: 'Are you contributing at least that much?', type: 'yesno', depends: { id: 'has', eq: 'Yes' } },
  ]},
  charitable: { title: 'Charitable intent', qs: [
    { id: 'gives', q: 'Do you give to charity regularly?', type: 'yesno' },
    { id: 'annual', q: 'Roughly how much per year?', type: 'choice', options: ['<$10k', '$10–50k', '$50–250k', '$250k+'], depends: { id: 'gives', eq: 'Yes' } },
    { id: 'vehicle', q: 'Through what vehicle?', type: 'choice', options: ['Cash / check', 'Donor-advised fund', 'Charitable trust', 'Private foundation'], depends: { id: 'gives', eq: 'Yes' } },
    { id: 'appreciated', q: 'Open to gifting appreciated stock?', type: 'yesno', depends: { id: 'gives', eq: 'Yes' } },
  ]},
  risk: { title: 'Risk tolerance', qs: [
    { id: 'tol', q: 'How would you describe your risk tolerance?', type: 'choice', options: ['Conservative', 'Moderate', 'Growth', 'Aggressive'] },
    { id: 'horizon', q: 'Primary time horizon?', type: 'choice', options: ['<5 yrs', '5–10 yrs', '10–20 yrs', '20 yrs+'] },
    { id: 'drawdown', q: 'Comfortable holding through a 20% drop?', type: 'yesno' },
  ]},
  residency: { title: 'Citizenship & residency', qs: [
    { id: 'citizen', q: 'Are you a U.S. citizen?', type: 'yesno' },
    { id: 'country', q: 'Country of citizenship?', type: 'text', depends: { id: 'citizen', eq: 'No' } },
    { id: 'greencard', q: 'Are you a U.S. permanent resident?', type: 'yesno', depends: { id: 'citizen', eq: 'No' } },
  ]},
  retireage: { title: 'Retirement timing', qs: [
    { id: 'age', q: 'Target retirement age?', type: 'choice', options: ['55', '60', '62', '65', '67', '70'] },
    { id: 'work', q: 'Plan to work part-time in retirement?', type: 'yesno' },
  ]},
  benefits: { title: 'Employer benefits', qs: [
    { id: 'hsa', q: 'Do you have a high-deductible plan with an HSA?', type: 'yesno' },
    { id: 'disability', q: 'Does your employer provide disability coverage?', type: 'yesno' },
    { id: 'espp', q: 'Do you have an ESPP available?', type: 'yesno' },
  ]},
  entity: { title: 'Business entity', qs: [
    { id: 'structure', q: 'How is your business structured?', type: 'choice', options: ['LLC', 'S-corp', 'Partnership', 'C-corp', 'Sole proprietor'] },
    { id: 'owners', q: 'More than one owner?', type: 'yesno' },
    { id: 'buysell', q: 'Is there a buy-sell agreement in place?', type: 'yesno', depends: { id: 'owners', eq: 'Yes' } },
  ]},
  confirm: { title: 'Quick confirmation', qs: [
    { id: 'ok', q: 'Is the information we have on file correct?', type: 'yesno' },
    { id: 'note', q: 'Anything we should update?', type: 'text', depends: { id: 'ok', eq: 'No' } },
  ]},
};

export function qpackKeyFor(title: string): string {
  const t = (title || '').toLowerCase();
  if (/household|children/.test(t)) return 'household';
  if (/dependent/.test(t)) return 'dependents';
  if (/residence|domicile|state of/.test(t)) return 'residence';
  if (/bracket/.test(t)) return 'bracket';
  if (/beneficiar/.test(t)) return 'beneficiaries';
  if (/match/.test(t)) return 'match';
  if (/charitable/.test(t)) return 'charitable';
  if (/risk/.test(t)) return 'risk';
  if (/citizenship|residency/.test(t)) return 'residency';
  if (/retirement age/.test(t)) return 'retireage';
  if (/employer benefits/.test(t)) return 'benefits';
  if (/entity/.test(t)) return 'entity';
  return 'confirm';
}
