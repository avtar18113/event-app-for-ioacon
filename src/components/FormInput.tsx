import React from "react";
import { TextInput, View, Text } from "react-native";
export default function FormInput({label, ...props}: any) {
  return (
    <View style={{ marginBottom:12 }}>
      {label ? <Text style={{ marginBottom:6, fontWeight:"600" }}>{label}</Text> : null}
      <TextInput
        placeholderTextColor="#999"
        style={{ borderWidth:1, borderColor:"#ddd", borderRadius:8, padding:12 }}
        {...props}
      />
    </View>
  );
}
