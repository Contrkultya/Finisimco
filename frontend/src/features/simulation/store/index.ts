import { useReducer } from 'react';
import type { Term } from '../types';

type State = {
  terms: Term[];
  guidanceSeen: boolean;
  timer: number;
};

type Action =
  | { type: 'update_value'; name: string; value: number }
  | { type: 'toggle_approval'; name: string }
  | { type: 'mark_guidance_seen' }
  | { type: 'tick_timer' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'update_value':
      return {
        ...state,
        terms: state.terms.map(t =>
          t.name === action.name
            ? { ...t, value: action.value, approved: false }
            : t
        ),
      };
    case 'toggle_approval':
      return {
        ...state,
        terms: state.terms.map(t =>
          t.name === action.name ? { ...t, approved: !t.approved } : t
        ),
      };
    case 'mark_guidance_seen':
      return { ...state, guidanceSeen: true };
    case 'tick_timer':
      return { ...state, timer: state.timer + 1 };
    default:
      return state;
  }
}

export function useSimulationStore(initialTerms: Term[]) {
  return useReducer(reducer, {
    terms: initialTerms,
    guidanceSeen: false,
    timer: 0,
  });
}
