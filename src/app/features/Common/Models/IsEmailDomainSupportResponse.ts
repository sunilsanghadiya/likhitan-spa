import { ApiResponse } from "../interfaces/ApiResponse";

export interface IsEmailDomainSupportResponse extends ApiResponse<IsEmailDomainSupportResponse> {
    isEmailSupport: boolean;
}