interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const Pagination = ({ page, totalPages, setPage }: PaginationProps) => {
  return (
    <div className="flex justify-center mt-6 gap-2">
      <button
        onClick={() => setPage(Math.max(page - 1, 1))}
        disabled={page === 1}
        className={`px-4 py-2 rounded-lg ${
          page === 1
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600 transition"
        }`}
      >
        이전
      </button>

      {[...Array(totalPages)].map((_, idx) => (
        <button
          key={idx}
          onClick={() => setPage(idx + 1)}
          className={`px-4 py-2 rounded-lg ${
            page === idx + 1
              ? "bg-blue-600 text-white font-bold"
              : "bg-gray-200 hover:bg-gray-300 transition"
          }`}
        >
          {idx + 1}
        </button>
      ))}

      <button
        onClick={() => setPage(page < totalPages ? page + 1 : page)}
        disabled={page >= totalPages}
        className={`px-4 py-2 rounded-lg ${
          page >= totalPages
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600 transition"
        }`}
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;
