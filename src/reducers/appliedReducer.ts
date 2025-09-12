export type AppliedState = Record<string, true>;

export type AppliedAction =
  | {  type: "TOGGLE"; id: string | number }
  | { type: "SET"; id: string | number; value: boolean  }
  | { type: "REMOVE"; id: string | number  };

export function appliedReducer(state: AppliedState, action: AppliedAction): AppliedState {
  switch (action.type) {
    case "TOGGLE": {
      const key = String(action.id);
      if (state[key]) {
        const { [key]: _, ...rest } = state;
        return rest;
      }
      return { ...state, [key]: true  };
    }
    case "SET": {
      const key = String(action.id);
      if (action.value) return { ...state, [key]: true  };
      const { [key]: _, ...rest } = state;
      return rest;
    }
    case "REMOVE": {
      const key = String(action.id);
      if (!state[key]) return  state;
      const { [key]: _, ...rest } = state;
      return rest;
    }
    default:
      return state;
  }
}
