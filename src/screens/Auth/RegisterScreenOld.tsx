import React, { useState } from "react";
import Screen from "../../components/Screen";
import FormInput from "../../components/FormInput";
import PrimaryButton from "../../components/PrimaryButton";
import { Text, Alert } from "react-native";
import { useAuth } from "../../context/AuthProvider";

export default function RegisterScreen() {
  const { register } = useAuth();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [password,setPassword] = useState("");

  const onSubmit = async () => {
    try { await register({ name, email, phone, password }); }
    catch(e:any){ Alert.alert("Register failed", e.message); }
  };

  return (
    <Screen>
      <Text style={{ fontSize:24, fontWeight:"800", marginBottom:16 }}>Create account</Text>
      <FormInput label="Name" value={name} onChangeText={setName} />
      <FormInput label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <FormInput label="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <FormInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <PrimaryButton title="Register" onPress={onSubmit} />
    </Screen>
  );
}
