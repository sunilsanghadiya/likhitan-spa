import { ApiResponse } from "../interfaces/ApiResponse";

export interface GetBlogsResponse extends ApiResponse<GetBlogsResponse> {
    authorId: number;
    isActive: boolean;
    blogId: number;
    content: string;
    thumbnailUrl: string;
    title: string;
    slug: string;
    likeCount: number;
    commentCount: number; 
    viewCount: number;
    comments: any; 
}