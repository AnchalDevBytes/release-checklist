export interface ReleaseStepDto {
  title: string;
  completed: boolean;
}

export interface CreateReleaseDto {
  name: string;
  date: Date;
  additionalInfo?: string;
}

export interface UpdateReleaseDto {
  additionalInfo?: string;
}

export type ReleaseStatus = "planned" | "ongoing" | "done";