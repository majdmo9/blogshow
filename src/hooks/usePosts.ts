import { postsAPI } from "@/Api/posts/api";
import { PostPropsResponse } from "@/types/post";
import { LocalStorageVariables } from "@/utils/constants";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface HistoryEntry {
  posts: PostPropsResponse[];
  nextKey: string | null;
  prevKey: string | null;
}

export const usePosts = (limit: number) => {
  const [posts, setPosts] = useState<PostPropsResponse[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const searchParams = useSearchParams();
  const cat = searchParams?.get("cat");

  const fetchPosts = async (limit: number, nextKey?: string) => {
    try {
      setLoading(true);
      if (history.length > currentIndex + 1) {
        if (cat) {
          setPosts(history[currentIndex + 1].posts.filter(el => el.category === cat));
        } else setPosts(history[currentIndex + 1].posts);
      } else {
        const response = await postsAPI.CRUD.getPaginationPosts(limit, nextKey);
        if (!response) {
          throw new Error("Failed to fetch posts");
        }
        if (cat) {
          setPosts(response.data.filter(el => el.category === cat));
        } else {
          setPosts(response.data);
        }
        const newHistory = { posts: response.data, nextKey: response.nextKey, prevKey: nextKey || null };
        setHistory(prevHistory => [...prevHistory.slice(0, currentIndex + 1), newHistory]);
      }

      setCurrentIndex(currentIndex + 1);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (posts.length) {
      localStorage.setItem(LocalStorageVariables.LatestPost, JSON.stringify(posts[0]));
    }
  }, [posts]);

  useEffect(() => {
    if (currentIndex >= 0 || cat) return;
    fetchPosts(limit);
  }, [currentIndex, limit]);

  useEffect(() => {
    if (cat) fetchPosts(limit);
  }, [cat]);

  const fetchMore = () => {
    const nextKey = history[currentIndex]?.nextKey;
    if (nextKey) {
      fetchPosts(limit, nextKey);
    }
  };

  const fetchPrevious = () => {
    if (currentIndex > 0) {
      if (cat) {
        setPosts(history[currentIndex - 1].posts.filter(el => el.category === cat));
      } else {
        setPosts(history[currentIndex - 1].posts);
      }
      setCurrentIndex(currentIndex - 1);
    }
  };

  return { posts, error, loading, fetchMore, fetchPrevious, hasMore: !!history[currentIndex]?.nextKey, hasPrevious: currentIndex > 0 };
};
