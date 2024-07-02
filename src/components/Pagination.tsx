const Pagination = ({
  hasMore,
  hasPrevious,
  fetchMore,
  fetchPrevious,
}: {
  hasMore: boolean;
  hasPrevious: boolean;
  fetchMore: () => void;
  fetchPrevious: () => void;
}) => {
  return (
    <div className="flex justify-between">
      <button
        className="width-[100px] p-4 bg-[#aa0022] text-white rounded-sm disabled:bg-slate-400"
        onClick={() => fetchPrevious()}
        disabled={!hasPrevious}
      >
        Previous
      </button>
      <button className="width-[100px] p-4 bg-[#aa0022] text-white rounded-sm disabled:bg-slate-400" onClick={() => fetchMore()} disabled={!hasMore}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
