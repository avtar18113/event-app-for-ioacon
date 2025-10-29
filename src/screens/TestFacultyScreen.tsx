import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";

const API_URL = "https://app.concepttc.com/api/v1/faculty/"; // your API endpoint

export default function TestFacultyScreen() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await axios.get(API_URL);
        console.log("API Response:", res.data);
        if (res.data?.success) {
          setData(res.data.data.items);
        } else {
          setError("Invalid response from server");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1e88e5" />
        <Text style={{ marginTop: 10 }}>Loading Faculty...</Text>
      </View>
    );

  if (error)
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>⚠️ {error}</Text>
      </View>
    );

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.photo_url || "https://via.placeholder.com/80x80.png?text=No+Photo" }}
        style={styles.image}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.desig}>{item.designation}</Text>
        <Text style={styles.org}>{item.organization}</Text>
        <Text style={[styles.city, styles.dNone]}>
          {[item.city, item.country].filter(Boolean).join(", ")}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>National Faculty</Text>
      <FlatList
        data={data}
        keyExtractor={(i) => String(i.id)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", paddingHorizontal: 10, paddingTop: 20 },
  header: { fontSize: 22, fontWeight: "800", color: "#1b0606ff", marginBottom: 10, textAlign: "center" },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: { width: 70, height: 70, borderRadius: 35, marginRight: 12 },
  name: { fontSize: 16, fontWeight: "700", color: "#333" },
  desig: { color: "#555" },
  org: { color: "#777", fontSize: 13 },
  city: { color: "#1e88e5", fontSize: 12, marginTop: 4 },
  dNone: { height: 0, width: 0 , display: 'none'},
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
