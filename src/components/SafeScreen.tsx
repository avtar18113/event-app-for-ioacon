import React from "react";
import { View, StatusBar, Platform, StyleSheet } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../theme/colors";

export default function SafeScreen({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView 
      style={[styles.safeArea, { paddingTop: insets.top-70, paddingBottom: insets.bottom-100 }]}
    >
      <StatusBar
      
        // translucent={false}
        backgroundColor={colors.bgPrimary || "#000"}
        barStyle={Platform.OS === "ios" ? "dark-content" : "dark-content"}
      />
      <View style={styles.inner}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  inner: { flex: 1 },
});
