"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useAddBook } from "@/components/hooks/useBooks";
import { message } from "antd";

interface PostBook {
  title: string;
  author: string;
  price: number;
  stock: number;
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

export default function AddBookForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(bookSchema),
  });

  const addBookMutation = useAddBook();

  // 책 추가 핸들러
  const onSubmit = async (data: PostBook) => {
    try {
      await addBookMutation.mutateAsync(data);
      message.success("책이 성공적으로 추가되었습니다!");

      router.push("/"); // 홈으로 이동
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(`책 추가 실패: ${error.message}`);
      } else {
        message.error("책 추가 실패: 알 수 없는 오류 발생");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">📚 새 책 추가</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* 제목 입력 */}
        <div>
          <label className="block font-medium">책 제목</label>
          <input
            type="text"
            {...register("title")}
            className="border border-gray-300 w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* 저자 입력 */}
        <div>
          <label className="block font-medium">저자</label>
          <input
            type="text"
            {...register("author")}
            className="border border-gray-300 w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
          )}
        </div>

        {/* 가격 입력 */}
        <div>
          <label className="block font-medium">가격 (원)</label>
          <input
            type="number"
            {...register("price")}
            className="border border-gray-300 w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* 재고 입력 */}
        <div>
          <label className="block font-medium">재고 수량</label>
          <input
            type="number"
            {...register("stock")}
            className="border border-gray-300 w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.stock && (
            <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
          )}
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {isSubmitting ? "추가 중..." : "책 추가하기"}
        </button>
      </form>
    </div>
  );
}
