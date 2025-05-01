import { ApiResponse } from "../interfaces/ApiResponse";


export interface BecomeAuthorResponse extends ApiResponse<BecomeAuthorResponse> {
    authorId: number;
}