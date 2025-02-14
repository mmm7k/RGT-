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
  onDelete: (id: string) => void;
}

const BooksTable = ({ books, onDelete }: BooksTableProps) => {
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
            <tr key={book.id} className="border-b hover:bg-gray-100">
              <td className="px-6 py-4">{book.title}</td>
              <td className="px-6 py-4">{book.author}</td>
              <td className="px-6 py-4 text-right">
                {book.price.toLocaleString()} 원
              </td>
              <td className="px-6 py-4 text-right">{book.stock}</td>
              <td className="px-6 py-4 flex justify-center gap-3">
                <button className="text-blue-500 hover:text-blue-700">
                  <AiFillEdit size={22} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => onDelete(book.id)}
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
