import { ApiResponse } from "../interfaces/ApiResponse";

export interface RefreshTokenResponse extends ApiResponse<RefreshTokenResponse> {
    accessToken: string;
    refreshToken: string;
}