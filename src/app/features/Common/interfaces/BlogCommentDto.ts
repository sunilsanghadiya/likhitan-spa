import { BlogActionTypes } from "../../../core/enums/BlogActionTypes";


export interface BlogCommentDto {
    actionType: BlogActionTypes;
    comment?: string;
    loggedInUserId: number;
    blogId: number;
    parentId?: number;
}