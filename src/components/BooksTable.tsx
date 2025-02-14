import Link from "next/link";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  stock: number;
  created_at: string;
}

interface BooksTableProps {
  books: Book[];
  handleDelete: (id: string) => void;
}

const BooksTable = ({ books, handleDelete }: BooksTableProps) => {
  return (
    <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-gray-100 text-gray-700">
            <th className="px-6 py-3 text-left font-semibold">제목</th>
            <th className="px-6 py-3 text-left font-semibold">저자</th>
            <th className="px-6 py-3 text-right font-semibold">가격 (원)</th>
            <th className="px-6 py-3 text-right font-semibold">재고</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="border-b hover:bg-gray-50">
              {/* 제목 */}
              <td className="px-6 py-3">
                <Link href={`/${book.id}`} className="block w-full h-full">
                  {book.title}
                </Link>
              </td>

              {/* 저자 */}
              <td className="px-6 py-3">
                <Link href={`/${book.id}`} className="block w-full h-full">
                  {book.author}
                </Link>
              </td>

              {/* 가격 */}
              <td className="px-6 py-3 text-right">
                <Link href={`/${book.id}`} className="block w-full h-full">
                  {book.price.toLocaleString()} 원
                </Link>
              </td>

              {/* 재고 */}
              <td className="px-6 py-3 text-right">
                <Link href={`/${book.id}`} className="block w-full h-full">
                  {book.stock}
                </Link>
              </td>

              {/* 수정, 삭제 버튼 */}
              <td className="px-6 py-3 flex justify-center gap-3">
                <Link
                  href={`/edit/${book.id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <AiFillEdit size={22} />
                </Link>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(book.id)}
                >
                  <AiFillDelete size={22} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
