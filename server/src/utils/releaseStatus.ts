import { ReleaseStatus } from "../interfaces/release.interface";

export const getReleaseStatus = (
  steps: { completed: boolean }[]
): ReleaseStatus => {
  const completed = steps.filter((step) => step.completed).length;

  if (completed === 0) return "planned";

  if (completed === steps.length) return "done";

  return "ongoing";
};