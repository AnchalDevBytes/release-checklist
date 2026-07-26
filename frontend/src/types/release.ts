export type ReleaseStatus = "planned" | "ongoing" | "done";

export interface Step {
  id: number;
  title: string;
  completed: boolean;
}

export interface Release {
  id: number;
  name: string;
  date: string;
  additionalInfo?: string;
  status: ReleaseStatus;
  steps: Step[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateReleasePayload {
  name: string;
  date: string;
  additionalInfo?: string;
}

export interface UpdateReleasePayload {
  additionalInfo: string;
}

export interface ToggleStepPayload {
  completed: boolean;
}
