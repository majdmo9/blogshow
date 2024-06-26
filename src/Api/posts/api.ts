import { createPost } from "./createPost";
import { deletePost } from "./deletePost";
import { editPost } from "./editPost";
import { getPaginationPosts } from "./getPaginationPosts";
import { getPost } from "./getPost";

export const postsAPI = {
  baseUrl: String(process.env.BASE_URL),
  CRUD: {
    getPaginationPosts,
    createPost,
    getPost,
    editPost,
    deletePost,
  },
  getPaginationPosts: function (limit: number, nextKey: string | null) {
    let url = `${this.baseUrl}/api/post/get-posts?limit=${limit}`;
    if (nextKey) {
      url += `&nextKey=${nextKey}`;
    }
    return url;
  },
  getPost: function (id: string) {
    return `${this.baseUrl}/api/post/get-post?id=${id}`;
  },
  createPostUrl: function () {
    return `${this.baseUrl}/api/post/create-post`;
  },
  deletePost: function (postId: string) {
    return `${this.baseUrl}/api/post/delete-post?postId=${postId}`;
  },
  editPost: function (postId: string) {
    return `${this.baseUrl}/api/post/edit-post?postId=${postId}`;
  },
};
