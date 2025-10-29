import { api } from "./client";
export async function getDashboard() {
  const { data } = await api.get("/dashboard/");
  return data.data.buttons as Array<{id:number; label:string; icon_url:string; deep_link?:string; web_url?:string;}>;
}
