import React, { useState } from "react";
import Screen from "../../components/Screen";
import FormInput from "../../components/FormInput";
import PrimaryButton from "../../components/PrimaryButton";
import { Text, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "../../context/AuthProvider";

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const onSubmit = async () => {
    try { await login(email, password); }
    catch (e:any) { Alert.alert("Login failed", e.message); }
  };

  return (
    <Screen>
      <Text style={{ fontSize:24, fontWeight:"800", marginBottom:16 }}>Welcome back</Text>
      <FormInput label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <FormInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <PrimaryButton title="Login" onPress={onSubmit} />
      <TouchableOpacity onPress={() => navigation.navigate("Forgot")} style={{ marginTop:16 }}>
        <Text style={{ color:"#1e88e5" }}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")} style={{ marginTop:12 }}>
        <Text>New here? <Text style={{ color:"#1e88e5" }}>Create account</Text></Text>
      </TouchableOpacity>
    </Screen>
  );
}
