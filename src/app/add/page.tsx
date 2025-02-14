import { Metadata } from "next";
import AddBookForm from "@/components/AddBookForm";

export const metadata: Metadata = {
  title: "책 추가 | RGT",
  description: "새로운 책을 추가하는 페이지입니다.",
};

export default function AddBookPage() {
  return <AddBookForm />;
}
