import { ApiResponse } from "../interfaces/ApiResponse";

export interface ForgotPasswordResponse extends ApiResponse<ForgotPasswordResponse> {
    id: number;
    email: string;
    accessToken: string;
}