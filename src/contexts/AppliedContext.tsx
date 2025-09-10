import { createContext, useContext, useEffect, useReducer } from "react";
import { appliedReducer } from "../reducers/appliedReducer";

type applied = {
  isApplied: (id: string | number) => boolean;
  toggleApplied: (id: string |number, value?: boolean) => void;
  removeApplied: (id: string |number) => void;
};


export const AppliedContext = createContext<applied | undefined>(undefined);

export function AppliedProvider({ children }: { children: React.ReactNode }) {
  const [appliedMap, dispatch] = useReducer(appliedReducer, {}, () => {
    try {
      const raw = localStorage.getItem("appliedFavorites" );
      return raw ? (JSON.parse(raw) as Record<string, true>) : {};
    } catch {
      return {};
    }
  });


  useEffect(() => {
    try {
      localStorage.setItem("appliedFavorites", JSON.stringify(appliedMap));
    } catch {}
  }, [appliedMap]);

  const isApplied = (id: string | number) => Boolean(appliedMap[String(id)]);
  const toggleApplied = (id: string | number, value?: boolean ) =>
    dispatch(typeof value === "boolean" ? { type: "SET", id, value } : { type: "TOGGLE", id });
  const removeApplied = (id: string | number) => dispatch({ type: "REMOVE", id });

  return (
    <AppliedContext.Provider value={{ isApplied, toggleApplied, removeApplied }}>
      {children}
    </AppliedContext.Provider>
  );
}

export function useApplied() {
  const ac  = useContext(AppliedContext );
  if (!ac ) throw new Error("Error");
  return ac;
}
