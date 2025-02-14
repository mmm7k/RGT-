import { AiOutlineSearch } from "react-icons/ai";

interface SearchBarProps {
  searchQueryTemp: string;
  setSearchQueryTemp: (value: string) => void;
  onSearch: () => void;
}

const SearchBar = ({
  searchQueryTemp,
  setSearchQueryTemp,
  onSearch,
}: SearchBarProps) => {
  return (
    <div className="flex items-center gap-2 rounded-lg border-2 border-solid shadow-sm">
      <input
        type="text"
        placeholder="제목 또는 저자로 검색해주세요."
        value={searchQueryTemp}
        onChange={(e) => setSearchQueryTemp(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        className="border-none bg-white px-4 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={onSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        <AiOutlineSearch size={20} />
      </button>
    </div>
  );
};

export default SearchBar;
