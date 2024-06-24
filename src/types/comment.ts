export interface CommentProps {
  content: string;
  createdAt: string;
  author: string;
  authorId: string;
  authorImage: string;
  postId: string;
}
export interface CommentResponseProps extends CommentProps {
  id: string;
}

export interface CommentEditProps {
  id: string;
  content: string;
}
