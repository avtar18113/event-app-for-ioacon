import React from "react";
import {  View } from "react-native";
export default function Screen({ children }: any) {
  return (
    <View style={{ flex:1, backgroundColor:"#fff" }}>
      <View style={{ flex:1, padding:16 }}>{children}</View>
    </View>
  );
}
