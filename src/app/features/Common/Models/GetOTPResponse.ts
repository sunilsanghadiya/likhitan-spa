import { ApiResponse } from "../interfaces/ApiResponse";


export interface GetOTPResponse extends ApiResponse<GetOTPResponse> {
    otp: string;
    expiredDate: string;
}