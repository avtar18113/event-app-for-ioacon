import { api } from "./client";
export async function getProgramDays() {
  const { data } = await api.get("/program/days");
  return data.data.days as string[];
}
export async function getProgramByDay(day: string) {
  const { data } = await api.get(`/program?day=${day}&limit=500`);
  return data.data.items;
}
export async function toggleBookmark(program_id: number, add=true) {
  const { data } = await api.post("/program/bookmark", { program_id, action: add ? "add" : "remove" });
  return data.data;
}
export async function getBookmarks() {
  const { data } = await api.get("/program/bookmarks");
  return data.data.items;
}
