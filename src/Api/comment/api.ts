import { createComment } from "./createComment";
import { deleteComment } from "./deleteComment";
import { editComment } from "./editComment";
import { getPostComments } from "./getPostComments";

export const commentAPI = {
  baseUrl: String(process.env.BASE_URL),
  CRUD: {
    createComment,
    getPostComments,
    deleteComment,
    editComment,
  },
  createComment: function () {
    return `${this.baseUrl}/api/comment/create-comment`;
  },
  getPostComments: function (postId: string) {
    return `${this.baseUrl}/api/comment/get-post-comments?postId=${postId}`;
  },
  deleteComment: function (commentId: string) {
    return `${this.baseUrl}/api/comment/delete-comment?commentId=${commentId}`;
  },
  editComment: function (commentId: string) {
    return `${this.baseUrl}/api/comment/edit-comment?commentId=${commentId}`;
  },
};
