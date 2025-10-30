import React from "react";
import { View } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function Screen({ children }: any) {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ flex: 1, padding: 16 }}>{children}</View>
      </View>
    </SafeAreaProvider>
  );
}
