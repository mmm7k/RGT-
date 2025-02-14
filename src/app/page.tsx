"use client";

import { useState } from "react";

import Link from "next/link";
import { useDeleteBook, useGetBooks } from "@/components/hooks/useBooks";
import SearchBar from "@/components/SearchBar";
import BooksTable from "@/components/BooksTable";
import Pagination from "@/components/Pagination";

export default function Home() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // 검색 적용
  const [searchQueryTemp, setSearchQueryTemp] = useState(""); // 입력 필드 값만 저장
  const { data } = useGetBooks(page, 10, searchQuery);
  const deleteBookMutation = useDeleteBook();

  // 검색 실행 (버튼 클릭 또는 엔터 입력 시)
  const handleSearch = () => {
    setSearchQuery(searchQueryTemp); // 검색어 반영
    setPage(1); // 검색 시 첫 페이지로 이동
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* 검색창 */}
      <SearchBar
        searchQueryTemp={searchQueryTemp}
        setSearchQueryTemp={setSearchQueryTemp}
        onSearch={handleSearch}
      />

      {/* 책 추가 버튼 */}
      <div className="flex justify-end my-4">
        <Link href="/add">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition">
            + 책 추가
          </button>
        </Link>
      </div>

      {/* 책 목록 테이블 */}
      <BooksTable
        books={data?.data || []}
        onDelete={(id) => deleteBookMutation.mutate(id)}
      />

      {/* 페이지네이션 */}
      <Pagination
        page={page}
        totalPages={Math.ceil((data?.totalCount || 1) / 10)}
        setPage={setPage}
      />
    </div>
  );
}
