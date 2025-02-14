"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useGetBookById, useUpdateBook } from "@/components/hooks/useBooks";
import { message } from "antd";

interface EditBook {
  title: string;
  author: string;
  price: number;
  stock: number;
}

interface EditBookFormProps {
  bookId: string;
}

// 유효성 검사 스키마
const bookSchema = yup.object().shape({
  title: yup.string().required("책 제목을 입력해주세요."),
  author: yup.string().required("저자를 입력해주세요."),
  price: yup
    .number()
    .typeError("가격은 숫자로 입력해야 합니다.")
    .required("가격을 입력해주세요.")
    .positive("가격은 양수여야 합니다."),
  stock: yup
    .number()
    .typeError("재고는 숫자로 입력해야 합니다.")
    .required("재고 수량을 입력해주세요.")
    .integer("재고는 정수로 입력해야 합니다.")
    .min(0, "재고는 0 이상이어야 합니다."),
});

export default function EditBookForm({ bookId }: EditBookFormProps) {
  const router = useRouter();
  const { data: book, isLoading } = useGetBookById(bookId);
  const updateBookMutation = useUpdateBook();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditBook>({
    resolver: yupResolver(bookSchema),
    defaultValues: book || {}, // 초기 값 설정
  });

  // 책 수정 핸들러
  const onSubmit = async (data: EditBook) => {
    try {
      await updateBookMutation.mutateAsync({ ...data, id: bookId });
      message.success("책 정보가 수정되었습니다!");
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(`책 수정 실패: ${error.message}`);
      } else {
        message.error("책 수정 실패: 알 수 없는 오류 발생");
      }
    }
  };

  if (isLoading) return <p className="text-center mt-10">로딩 중...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">📚 책 수정</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* 제목 입력 */}
        <div>
          <label className="block font-medium">책 제목</label>
          <input
            type="text"
            {...register("title")}
            defaultValue={book?.title}
            className="border border-gray-300 w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.title?.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.title.message as string}
            </p>
          )}
        </div>

        {/* 저자 입력 */}
        <div>
          <label className="block font-medium">저자</label>
          <input
            type="text"
            {...register("author")}
            defaultValue={book?.author}
            className="border border-gray-300 w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">
              {errors.author.message as string}
            </p>
          )}
        </div>

        {/* 가격 입력 */}
        <div>
          <label className="block font-medium">가격 (원)</label>
          <input
            type="number"
            {...register("price")}
            defaultValue={book?.price}
            className="border border-gray-300 w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">
              {errors.price.message as string}
            </p>
          )}
        </div>

        {/* 재고 입력 */}
        <div>
          <label className="block font-medium">재고 수량</label>
          <input
            type="number"
            {...register("stock")}
            defaultValue={book?.stock}
            className="border border-gray-300 w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.stock && (
            <p className="text-red-500 text-sm mt-1">
              {errors.stock.message as string}
            </p>
          )}
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {isSubmitting ? "수정 중..." : "책 수정하기"}
        </button>
      </form>
    </div>
  );
}
