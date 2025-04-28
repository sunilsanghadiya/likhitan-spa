import { ApiResponse } from "../interfaces/ApiResponse";

export interface LogoutResponse extends ApiResponse<LogoutResponse> {
    isLogout: boolean;
}