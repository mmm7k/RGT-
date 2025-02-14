import { Metadata } from "next";
import EditBookForm from "@/components/EditBookForm";
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
    title: book ? `${book.title} | 수정 | RGT` : "책 수정 | RGT",
    description: book
      ? `${book.title} 정보를 수정하는 페이지입니다.`
      : "책 정보를 수정하는 페이지입니다.",
  };
}

export default function EditBookPage({ params }: Props) {
  return <EditBookForm bookId={params.id} />;
}
