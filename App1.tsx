import React from "react";
import { AuthProvider } from "./src/context/AuthProvider";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  console.log("✅ App starting...");

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
