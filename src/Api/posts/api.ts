import { createPost } from "./createPost";
import { deletePost } from "./deletePost";
import { editPost } from "./editPost";
import { getCategoryPosts } from "./getCategoryPosts";
import { getPaginationPosts } from "./getPaginationPosts";
import { getPost } from "./getPost";

export const postsAPI = {
  baseUrl: String(process.env.NEXT_PUBLIC_API_BASE_URL),
  CRUD: { getPaginationPosts, createPost, getPost, editPost, deletePost, getCategoryPosts },
  getPaginationPosts: function (limit: number, nextKey: string | null, userId: string) {
    let url = `${this.baseUrl}/api/post/get-posts?limit=${limit}&userId=${userId}`;
    if (nextKey) {
      url += `&nextKey=${nextKey}`;
    }
    return url;
  },
  getCategoryPosts: function (limit: number, nextKey: string | null, userId: string, category: string) {
    let url = `${this.baseUrl}/api/post/get-category-posts?limit=${limit}&userId=${userId}&category=${category}`;
    if (nextKey) {
      url += `&nextKey=${nextKey}`;
    }
    return url;
  },
  getPost: function (id: string, userId: string) {
    return `${this.baseUrl}/api/post/get-post?id=${id}&userId=${userId}`;
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
