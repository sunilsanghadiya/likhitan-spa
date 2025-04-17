import { ApiResponse } from "../interfaces/ApiResponse";


export interface SendOTPResponse extends ApiResponse<SendOTPResponse> {
    isOtpSend: boolean;
}