import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabaseClient";

// API 핸들러
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { data, error } = await supabase.from("books").select("*");
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const { title, author, price, stock } = req.body;
    const { data, error } = await supabase
      .from("books")
      .insert([{ title, author, price, stock }]);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  }

  if (req.method === "PUT") {
    const { id, title, author, price, stock } = req.body;
    const { data, error } = await supabase
      .from("books")
      .update({ title, author, price, stock })
      .eq("id", id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    const { data, error } = await supabase.from("books").delete().eq("id", id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
