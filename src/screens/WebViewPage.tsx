import React from "react";
import { WebView } from "react-native-webview";
import { View, ActivityIndicator } from "react-native";

export default function WebViewPage({ route }: any) {
  const { url } = route.params;
  return (
    <View style={{ flex:1 }}>
      <WebView source={{ uri: url }} startInLoadingState renderLoading={() => <ActivityIndicator style={{ marginTop:20 }} />} />
    </View>
  );
}
