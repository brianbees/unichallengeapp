import { useCallback, useMemo, useReducer } from 'react';

const initial = {
  teams: { A: 'Team A', B: 'Team B', C: 'Team C', D: 'Team D' },
  scores: { A: 0, B: 0, C: 0, D: 0 },
  events: [],
};

function clamp(n) { return Math.max(0, n|0); }

function reducer(state, action) {
  switch (action.type) {
    case 'setTeamName': {
      const { team, name } = action;
      return { ...state, teams: { ...state.teams, [team]: name } };
    }
    case 'addScore': {
      const { team, delta } = action;
      const ev = { team, delta, t: Date.now() };
      const scores = { ...state.scores, [team]: clamp(state.scores[team] + delta) };
      return { ...state, scores, events: [...state.events, ev] };
    }
    case 'undo': {
      if (!state.events.length) return state;
      const last = state.events[state.events.length - 1];
      const scores = { ...state.scores, [last.team]: clamp(state.scores[last.team] - last.delta) };
      return { ...state, scores, events: state.events.slice(0, -1) };
    }
    case 'resetAll': {
      return { ...state, scores: { A:0,B:0,C:0,D:0 }, events: [] };
    }
    default:
      return state;
  }
}

export function useScores() {
  const [state, dispatch] = useReducer(reducer, initial);

  const setTeamName = useCallback((team, name) => dispatch({ type:'setTeamName', team, name }), []);
  const addScore = useCallback((team, delta) => dispatch({ type:'addScore', team, delta }), []);
  const undo = useCallback(() => dispatch({ type:'undo' }), []);
  const resetAll = useCallback(() => dispatch({ type:'resetAll' }), []);

  const aggregate = useMemo(() => ({
    left: clamp(state.scores.A + state.scores.C),
    right: clamp(state.scores.B + state.scores.D),
  }), [state.scores]);

  return { state, setTeamName, addScore, undo, resetAll, aggregate };
}
