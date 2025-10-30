import React, { useEffect, useState } from "react";
import AppCarousel from "../components/AppCarousel";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { colors } from "../theme/colors";
import SafeScreen from "../components/SafeScreen";

const screenWidth = Dimensions.get("window").width;

export default function DashboardScreen({ navigation }: any) {
  const [banners, setBanners] = useState<any[]>([]);
  const [buttons, setButtons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const [bannerRes, menuRes] = await Promise.all([
        axios.get("https://app.concepttc.com/api/v1/dashboard/carousel"),
        axios.get("https://app.concepttc.com/api/v1/dashboard/menu"),
      ]);

      if (bannerRes.data.success) setBanners(bannerRes.data.data.banners);
      if (menuRes.data.success) setButtons(menuRes.data.data.buttons);
    } catch (err) {
      console.error("Dashboard load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 10, color: colors.primary }}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeScreen>
    <ScrollView style={styles.container} >
      {/* Carousel */}

      <AppCarousel banners={banners} />
      {/* Buttons Grid */}
      <View style={styles.gridContainer}>
        {buttons.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => {
              if (item.web_url && item.web_url !== "") {
                navigation.navigate("WebViewPage", { url: item.web_url, title: item.title });
              } else if (item.slug) {
                navigation.navigate(item.slug);
              }
            }}
          >
            <View style={styles.iconBox}>
              <Ionicons name={item.icon || "apps"} size={26} color={colors.primary} />
            </View>
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>

        ))}
      </View>
    </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 0,
    position: "relative",
  },
  card: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  iconBox: {
    backgroundColor: "#E8F5E9",
    padding: 12,
    borderRadius: 50,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});
