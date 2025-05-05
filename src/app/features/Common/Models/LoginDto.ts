import { ApiResponse } from "../interfaces/ApiResponse";

export interface LoginResponse extends ApiResponse<LoginResponse> {
    id: number;
    name?: string;
    email?: string;
    isActive: boolean;
    isUserVerified: boolean;
    roleId: number;
    accessToken: string;
    refreshToken: string;
    authorId?: number;
}