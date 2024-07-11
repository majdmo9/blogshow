"use client";
import { postsAPI } from "@blogshow/Api/posts/api";
import useAuthUser from "@blogshow/hooks/useUser";
import { CategoryPostProps, PostPropsResponse } from "@blogshow/types/post";
import { LocalStorageVariables, PostsPageLimit } from "@blogshow/utils/constants";
import { useSearchParams } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface HistoryEntry {
  posts: PostPropsResponse[] | CategoryPostProps[];
  nextKey: string | null;
  prevKey: string | null;
}

export const PostsContext = createContext<{
  posts: PostPropsResponse[] | CategoryPostProps[];
  error: string | null;
  loading: boolean;
  fetchMore: () => void;
  fetchPrevious: () => void;
  hasMore: boolean;
  hasPrevious: boolean;
}>({
  posts: [],
  error: null,
  loading: false,
  fetchMore: () => {},
  fetchPrevious: () => {},
  hasMore: false,
  hasPrevious: false,
});

export const PostsContextProvider = ({ children }: Props) => {
  const [posts, setPosts] = useState<PostPropsResponse[] | CategoryPostProps[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [catHistory, setCatHistory] = useState<HistoryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const user = useAuthUser();
  const searchParams = useSearchParams();
  const cat = searchParams?.get("cat");

  const setNewHistory = (response: { data: PostPropsResponse[]; nextKey: string | null }, nextKey: string | undefined) => {
    const newHistory = { posts: response.data, nextKey: response.nextKey, prevKey: nextKey || null };
    setHistory(prevHistory => [...prevHistory.slice(0, currentIndex + 1), newHistory]);
  };
  const setNewCatHistory = (response: { data: CategoryPostProps[]; nextKey: string | null }, nextKey: string | undefined) => {
    const newHistory = { posts: response.data, nextKey: response.nextKey, prevKey: nextKey || null };
    setCatHistory(prevHistory => [...prevHistory.slice(0, currentIndex + 1), newHistory]);
  };

  const fetchPosts = useCallback(
    async (limit: number, nextKey?: string) => {
      try {
        if (!user?.userId) throw new Error("Sign in or sign up");
        setLoading(true);
        if (history.length > currentIndex + 1 && !cat) {
          setPosts(history[currentIndex + 1].posts as PostPropsResponse[]);
        } else if (catHistory.length > currentIndex + 1) {
          setPosts(catHistory[currentIndex + 1].posts as CategoryPostProps[]);
        } else {
          let response;
          if (cat) response = await postsAPI.CRUD.getCategoryPosts(limit, nextKey, user.userId, cat);
          else response = await postsAPI.CRUD.getPaginationPosts(limit, nextKey, user.userId);

          if (response === 403) throw new Error("You reached the fetch limit!");
          if (!response) throw new Error("Failed to fetch posts");

          const resPosts = (response as { data: CategoryPostProps[]; nextKey: string | null }).data;
          setPosts(resPosts);

          if (cat) {
            setNewCatHistory(response as { data: CategoryPostProps[]; nextKey: string | null }, nextKey);
          } else {
            setNewHistory(response as { data: PostPropsResponse[]; nextKey: string | null }, nextKey);
          }
        }
        setCurrentIndex(currentIndex + 1);
        setError(null);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    },
    [currentIndex, setPosts, history, user, cat, catHistory]
  );

  useEffect(() => {
    if (currentIndex >= 0) return;
    fetchPosts(PostsPageLimit);
  }, [currentIndex, fetchPosts]);

  useEffect(() => {
    setCurrentIndex(-1);
    setCatHistory([]);
    setHistory([]);
    setPosts([]);
    setError(null);
  }, [cat]);

  const fetchMore = () => {
    const nextKey = history[currentIndex]?.nextKey;
    if (nextKey) {
      fetchPosts(PostsPageLimit, nextKey);
    }
  };

  const fetchPrevious = () => {
    if (currentIndex > 0) {
      setPosts(history[currentIndex - 1].posts);
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <PostsContext.Provider
      value={{ posts, error, loading, fetchMore, fetchPrevious, hasMore: !!history[currentIndex]?.nextKey, hasPrevious: currentIndex > 0 }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);
