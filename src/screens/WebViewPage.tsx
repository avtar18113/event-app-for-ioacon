import React, { useState, useRef } from "react";
import SafeScreen from "../components/SafeScreen";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  Platform,
} from "react-native";
import { WebView } from "react-native-webview";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

export default function WebViewPage({ route, navigation }: any) {
  const { url, title } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const webViewRef = useRef<any>(null);
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
    } else {
      navigation.goBack();
    }
  };

  const handleReload = () => {
    if (webViewRef.current) webViewRef.current.reload();
  };

  return (
    <SafeScreen>
    <View
      style={[
        styles.container,
        { paddingTop: Platform.OS === "ios" ? insets.top : StatusBar.currentHeight },
      ]}
    >
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "dark-content"}
        backgroundColor={colors.bgPrimary || "#fff"}
      />

      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text numberOfLines={1} style={styles.title}>
          {title || "Web View"}
        </Text>
        <TouchableOpacity onPress={handleReload} style={styles.reloadButton}>
          <Ionicons name="refresh" size={22} color={colors.primary} />
        </TouchableOpacity>
      </View>

      
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        startInLoadingState={true}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}
        allowsBackForwardNavigationGestures
        style={styles.webview}
      />

     
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>
            Loading {Math.round(progress * 100)}%
          </Text>
        </View>
      )}
    </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    elevation: 3,
  },
  backButton: {
    padding: 6,
  },
  reloadButton: {
    padding: 6,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
    textAlign: "center",
    marginHorizontal: 10,
  },
  webview: { flex: 1 },
  loaderContainer: {
    position: "absolute",
    top: "45%",
    alignSelf: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    color: colors.primary,
    fontSize: 13,
  },
});
