import { ApiResponse } from "../interfaces/ApiResponse";


export interface BlogCommentResponse extends ApiResponse<BlogCommentResponse> {
    comment?: string;
    created?: string
}