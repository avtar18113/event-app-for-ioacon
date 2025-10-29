import { api } from "./client";
export async function getNotifications(page=1, limit=50) {
  const { data } = await api.get(`/notifications?page=${page}&limit=${limit}`);
  return data.data.items;
}
export async function markNotificationRead(notification_id: number) {
  const { data } = await api.post("/notifications/mark-read", { notification_id });
  return data.data;
}
