import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";

// 책 목록 조회
const fetchBooks = async (
  page: number,
  itemsPerPage: number,
  searchQuery: string
) => {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage - 1;

  let query = supabase.from("books").select("*", { count: "exact" });

  if (searchQuery) {
    query = query.or(
      `title.ilike.%${searchQuery}%,author.ilike.%${searchQuery}%`
    );
  }

  const { data, error, count } = await query
    .order("created_at", { ascending: false })
    .range(start, end);

  if (error) throw new Error(error.message);
  return { data, totalCount: count };
};

export const useGetBooks = (
  page: number,
  itemsPerPage: number,
  searchQuery: string
) => {
  return useQuery({
    queryKey: ["books", page, searchQuery],
    queryFn: () => fetchBooks(page, itemsPerPage, searchQuery),
  });
};

// 책 삭제 API
export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("books").delete().eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["books"] }), // 삭제 후 목록 갱신
  });
};

// 책 추가 API
export const useAddBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newBook: {
      title: string;
      author: string;
      price: number;
      stock: number;
    }) => {
      const { error } = await supabase.from("books").insert([newBook]);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["books"] }), // 추가 후 목록 갱신
  });
};
