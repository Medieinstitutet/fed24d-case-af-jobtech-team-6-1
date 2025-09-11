import { useContext } from "react";
import { JobContext } from "../contexts/JobContext";
import { JobActionType } from "../reducers/JobReducer";

export function useJobActions() {
  const { dispatch } = useContext(JobContext);

  const removeJob = (id: string) => {
    dispatch({
      type: JobActionType.REMOVEADD,
      payload: id,
    });
  };

  return {
    removeJob,
  };
}