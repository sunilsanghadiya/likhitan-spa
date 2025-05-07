import { ApiResponse } from "../interfaces/ApiResponse";

export interface WriteBlogResponse extends ApiResponse<WriteBlogResponse> {
    isBlogPosted: boolean;
}