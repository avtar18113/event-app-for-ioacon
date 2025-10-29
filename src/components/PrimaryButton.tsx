import React from "react";
import { TouchableOpacity, Text } from "react-native";
export default function PrimaryButton({ title, onPress }: {title:string; onPress:()=>void}) {
  return (
    <TouchableOpacity onPress={onPress} style={{ backgroundColor:"#1e88e5", padding:14, borderRadius:8, alignItems:"center" }}>
      <Text style={{ color:"#fff", fontWeight:"700" }}>{title}</Text>
    </TouchableOpacity>
  );
}
