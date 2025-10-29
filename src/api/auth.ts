import { api } from "./client";
import { DEFAULT_TZ } from "../config";

export async function login(email: string, password: string) {
  const { data } = await api.post("/auth/login", {
    email,
    password,
    fcm_token: "",        // add later
    platform: "android",  // or ios
    tz_iana: DEFAULT_TZ,
  });
  return data.data; // { user, token }
}

export async function register(payload: {
  name: string; email: string; phone?: string; password: string;
}) {
  const { data } = await api.post("/auth/register", payload);
  return data.data;
}

export async function forgot(email: string) {
  const { data } = await api.post("/auth/forgot", { email });
  return data.data;
}
