import { Metadata } from "next";
import BookDetail from "@/components/BookDetail";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

interface Props {
  params: { id: string };
}

// 동적으로 메타데이터 생성
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const bookId = params.id;

  // Supabase에서 책 정보 가져오기
  const { data: book, error } = await supabase
    .from("books")
    .select("title")
    .eq("id", bookId)
    .single();

  if (error) {
    console.error("Error fetching book:", error.message);
  }

  return {
    title: book ? `${book.title} | RGT` : "책 상세 | RGT",
    description: book
      ? `${book.title}의 상세 정보 페이지입니다.`
      : "책의 상세 정보를 확인하는 페이지입니다.",
  };
}

export default function BookDetailPage({ params }: Props) {
  return <BookDetail bookId={params.id} />;
}
