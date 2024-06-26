"use client";
import Card from "./Card";
import Pagination from "./Pagination";
import Loader from "./Loader";
import { usePosts } from "@blogshow/hooks/usePosts";

const limit = 2;
const CardList = () => {
  const { posts, loading, hasMore, hasPrevious, fetchMore, fetchPrevious } = usePosts(limit);

  return (
    <div className="flex-[5]">
      <h1 className="my-[50px] font-semibold text-3xl">Recent Posts</h1>
      <div className={loading || !posts.length ? "flex items-center justify-center min-h-[500px]" : ""}>
        {loading ? (
          <Loader />
        ) : posts.length ? (
          posts.map(post => <Card key={post.id} compKey={post.id} post={post} />)
        ) : (
          <h2 className="text-center text-xl">No more posts to preview...</h2>
        )}
      </div>
      <Pagination hasMore={hasMore} hasPrevious={hasPrevious} fetchMore={fetchMore} fetchPrevious={fetchPrevious} />
    </div>
  );
};

export default CardList;
