import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthApi from "../api/auth";

type User = { id: number; name: string; email: string; };
type Ctx = {
  user: User | null;
  loading: boolean;
  login: (email:string, password:string) => Promise<void>;
  register: (p: {name:string; email:string; phone?:string; password:string}) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthCtx = createContext<Ctx>(null as any);
export const useAuth = () => useContext(AuthCtx);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user,setUser] = useState<User|null>(null);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem("authUser");
      setUser(raw ? JSON.parse(raw) : null);
      setLoading(false);
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await AuthApi.login(email, password);
    await AsyncStorage.setItem("authToken", res.token);
    await AsyncStorage.setItem("authUser", JSON.stringify(res.user));
    setUser(res.user);
  };

  const register = async (p: {name:string; email:string; phone?:string; password:string}) => {
    const res = await AuthApi.register(p);
    await AsyncStorage.setItem("authToken", res.token);
    await AsyncStorage.setItem("authUser", JSON.stringify(res.user));
    setUser(res.user);
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(["authToken","authUser"]);
    setUser(null);
  };

  return (
    <AuthCtx.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthCtx.Provider>
  );
};
