import type { Term } from '../types';

export function calculateValuation(terms: Term[]): number {
  const ebitda = terms.find(t => t.name === 'EBITDA')?.value ?? 0;
  const multiple = terms.find(t => t.name === 'Multiple')?.value ?? 0;
  const factor = terms.find(t => t.name === 'Factor Score')?.value ?? 0;

  return ebitda * multiple * factor;
}
