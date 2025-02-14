"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetBookById, useDeleteBook } from "@/components/hooks/useBooks";
import Link from "next/link";
import { message } from "antd";

interface BookDetailProps {
  bookId: string;
}

export default function BookDetail({ bookId }: BookDetailProps) {
  const router = useRouter();
  const { data: book, isLoading, error } = useGetBookById(bookId);
  const deleteBookMutation = useDeleteBook();

  if (isLoading)
    return (
      <p className="text-center mt-10 text-lg">📖 책 정보를 불러오는 중...</p>
    );
  if (error)
    return (
      <p className="text-center text-red-500">⚠️ 오류 발생: {error.message}</p>
    );

  // 책 삭제 핸들러
  const handleDelete = async () => {
    const confirmDelete = confirm("정말 이 책을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    await deleteBookMutation.mutateAsync(bookId);
    message.success("책이 삭제되었습니다.");
    router.push("/"); // 삭제 후 홈으로 이동
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">📖 책 상세 정보</h1>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">📌 제목</h2>
          <p className="text-gray-700">{book.title}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">✍️ 저자</h2>
          <p className="text-gray-700">{book.author}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">💰 가격</h2>
          <p className="text-gray-700">{book.price.toLocaleString()} 원</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">📦 재고</h2>
          <p className="text-gray-700">{book.stock} 개</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">🕒 생성 날짜</h2>
          <p className="text-gray-500">
            {new Date(book.created_at).toLocaleString()}
          </p>
        </div>

        {/* 버튼 영역 */}
        <div className="flex justify-between mt-6">
          <Link href="/">
            <button className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition">
              뒤로가기
            </button>
          </Link>
          <div className="flex gap-2">
            <Link href={`/edit/${bookId}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                수정
              </button>
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
