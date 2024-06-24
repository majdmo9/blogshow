export interface PostProps {
  title: string;
  description: string;
  createdAt: string;
  author: string;
  authorId: string;
  authorImage: string;
  category: string;
  imageUrl: string;
  videoUrl?: string;
}

export interface PostPropsResponse extends PostProps {
  id: string;
}

export interface PostEditProps {
  postId: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string;
}
