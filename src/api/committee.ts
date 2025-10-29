import { api } from "./client";
export async function getCommittee() {
  const { data } = await api.get("/committee");
  return data.data.items;
}
