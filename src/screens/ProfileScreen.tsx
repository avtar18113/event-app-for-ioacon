import React from "react";
import Screen from "../components/Screen";
import { useAuth } from "../context/AuthProvider";
import { Text } from "react-native";
import PrimaryButton from "../components/PrimaryButton";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  return (
    <Screen>
      <Text style={{ fontSize:18, fontWeight:"800" }}>Profile</Text>
      <Text style={{ marginTop:8 }}>{user?.name}</Text>
      <Text>{user?.email}</Text>
      <PrimaryButton title="Logout" onPress={logout} />
    </Screen>
  );
}
