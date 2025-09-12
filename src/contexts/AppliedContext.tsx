import { createContext, useContext, useReducer } from "react";
import { appliedReducer } from "../reducers/appliedReducer";

type AppliedCon = {
  isApplied: (id: string | number) => boolean;
  toggleApplied: (id: string | number, value?: boolean) => void;
  removeApplied: (id: string | number) => void;
};

export const AppliedContext = createContext<AppliedCon | undefined>(undefined);

  const save = (next: Record<string, true>) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };

const KEY = "appliedFavorites";
export function AppliedProvider({ children }: { children: React.ReactNode }) {
  const [appliedMap, dispatch] = useReducer(appliedReducer, {}, () => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      return raw ? (JSON.parse(raw) as Record<string, true>) : {};
    } catch {
      return {};
    }
  });


  const commit = (action: any) => {
    const next = appliedReducer(appliedMap, action);
    save(next);
    dispatch(action);
  };

  const isApplied = (id: string | number) => Boolean(appliedMap[String(id)]);

  const toggleApplied = (id: string | number, value?: boolean) =>
    commit(
      typeof value === "boolean"
        ? { type: "SET", id, value }
        : { type: "TOGGLE", id }
    );

  const removeApplied = (id: string | number) =>
    commit({ type: "REMOVE", id });

  return (
    <AppliedContext.Provider value={{ isApplied, toggleApplied, removeApplied }}>
      {children}
    </AppliedContext.Provider>
  );
}

export function useApplied() {
  const ac = useContext(AppliedContext);
  if (!ac) throw new Error("Error");
  return ac;
}
