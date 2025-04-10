import { ApiResponse } from "../interfaces/ApiResponse";

export interface RegisterResponse extends ApiResponse<RegisterResponse> {
    id: number;
    name?: string;
    email?: string;
    isActive: boolean;
    isUserVerified: boolean;
    roleId: number;
    accessToken: string;
    refreshToken: string;
}