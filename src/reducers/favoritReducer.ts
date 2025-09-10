import type { Job } from "../models/Job";

export type FavState = Record<string, Job>;

export type FavAction =
  | { type: "ADD"; job: Job }
  | { type: "REMOVE"; id: string | number };

export function favoritReducer(state: FavState, action: FavAction): FavState {
  switch (action.type) {
    case "ADD": {
      const favKey = String((action.job as any).id);
      return state[favKey] ? state : { ...state, [favKey]: action.job };
    }
    case "REMOVE": {
      const favKey = String(action.id);
      if (!state[favKey]) return state;
      const { [favKey]: _, ...rest } = state;
      return rest;
    }
    default:
      return state;
  }
}
