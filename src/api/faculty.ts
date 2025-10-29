import { api } from "./client";
export async function getFaculty(page=1, limit=50) {
  const { data } = await api.get(`/faculty?page=${page}&limit=${limit}`);
  return data.data.items;
}
