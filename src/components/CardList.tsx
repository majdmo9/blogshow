"use client";
import Card from "./Card";
import Pagination from "./Pagination";
import Loader from "./Loader";
import { usePosts } from "@blogshow/context/PostsContext";
import Link from "next/link";

const CardList = () => {
  const { posts, loading, hasMore, hasPrevious, fetchMore, fetchPrevious, error } = usePosts();

  return (
    <div className="flex-[5]">
      <h1 className="my-[50px] font-semibold text-3xl">Recent Posts</h1>
      <div className={loading || !posts.length ? "flex items-center justify-center min-h-[500px]" : ""}>
        {loading ? (
          <Loader />
        ) : posts.length ? (
          posts.map((post, i) => <Card key={post.id} compKey={post.id} post={post} line={i < posts.length - 1} />)
        ) : error === "Sign in or sign up" ? (
          <h2 className="text-center text-xl">
            <Link href="/login" className="underline">
              Sign in
            </Link>{" "}
            or{" "}
            <Link href="signup" className="underline">
              sign up
            </Link>{" "}
          </h2>
        ) : error === "You reached the fetch limit!" ? (
          <h2 className="text-center text-xl">{error}</h2>
        ) : (
          <h2 className="text-center text-xl">No more posts to preview...</h2>
        )}
      </div>
      <Pagination hasMore={hasMore} hasPrevious={hasPrevious} fetchMore={fetchMore} fetchPrevious={fetchPrevious} />
    </div>
  );
};

export default CardList;
