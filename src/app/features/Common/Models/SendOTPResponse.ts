import { ApiResponse } from "../interfaces/ApiResponse";


export interface SendOTPResponse extends ApiResponse<SendOTPResponse> {
    IsOtpSend: boolean;
}