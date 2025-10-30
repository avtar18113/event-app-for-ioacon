import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import { colors } from "../theme/colors";

export default function MessageScreen() {
  const [data, setData] = useState<MessageData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMessage = async () => {
    try {
      const res = await axios.get("https://app.concepttc.com/api/v1/message/index.php");
      if (res.data.success) setData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );

  if (!data) return null;

  return (
    <ScrollView style={styles.container}>
      {/* Common Message */}
      <View style={styles.messageBox}>
        <Text style={styles.commonMessage}>{data.message}</Text>
      </View>

      <Text style={styles.sectionTitle}>Message From</Text>

      {/* Message Providers */}
      {data.providers.map((p) => (
        <View key={p.id} style={styles.cardRow}>
          <Image source={{ uri: p.photo }} style={styles.photoRow} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{p.name}</Text>
            <Text style={styles.designation}>{p.designation}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 12 },
  messageBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    elevation: 3,
  },
  commonMessage: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
    textAlign: "justify",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  photoRow: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primary,
  },
  designation: {
    fontSize: 13,
    color: "#555",
    marginTop: 3,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
