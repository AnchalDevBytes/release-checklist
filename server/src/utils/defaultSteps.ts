import { ReleaseStepDto } from "../interfaces/release.interface";

export const DEFAULT_STEPS: ReleaseStepDto[] = [
  {
    title: "Code Freeze",
    completed: false,
  },
  {
    title: "QA Approval",
    completed: false,
  },
  {
    title: "Deploy to Staging",
    completed: false,
  },
  {
    title: "Smoke Testing",
    completed: false,
  },
  {
    title: "Production Backup",
    completed: false,
  },
  {
    title: "Deploy to Production",
    completed: false,
  },
  {
    title: "Monitoring",
    completed: false,
  },
];
