import { ApiResponse } from "../interfaces/ApiResponse";

export interface CheckAuthResponse extends ApiResponse<CheckAuthResponse> {
    isAuthenticated: boolean;
}