import React, { useState } from "react";
import Screen from "../../components/Screen";
import FormInput from "../../components/FormInput";
import PrimaryButton from "../../components/PrimaryButton";
import { Text, Alert } from "react-native";
import { forgot } from "../../api/auth";

export default function ForgotScreen() {
  const [email,setEmail] = useState("");
  const onSubmit = async () => {
    try { await forgot(email); Alert.alert("Check your inbox", "We sent reset instructions (if enabled)."); }
    catch(e:any){ Alert.alert("Error", e.message); }
  };
  return (
    <Screen>
      <Text style={{ fontSize:24, fontWeight:"800", marginBottom:16 }}>Forgot Password</Text>
      <FormInput label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <PrimaryButton title="Send reset link" onPress={onSubmit} />
    </Screen>
  );
}
