import { ApiResponse } from "../interfaces/api-response.interface";

export const successResponse = <T>(
  message: string,
  data?: T
): ApiResponse<T> => ({
  success: true,
  message,
  data,
});

export const errorResponse = (
  message: string,
  errors?: string[]
): ApiResponse => ({
  success: false,
  message,
  errors,
});
