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
        <Text style={styles.sectionTitle}>Welcome Message</Text>     
        <Text style={styles.commonMessage}>On behalf of the organizing committee, it gives me immense
          pleasure to welcome you to the 70th Annual National Conference of the Indian Orthopaedic Association - IOACON
          2025,
          being
          held in the Beautiful, Natural and culturally vibrant city of Guwahati, the gateway to the
          enchanting Seven Sisters and a brother, of Northeast India.</Text>
        <Text style={styles.commonMessage}>This landmark event, “Platinum Jubilee Conference” celebrating seven decades of orthopaedic excellence, is a
          testament to the enduring commitment and collaboration of our community. Over the years, this conference has been a
          cornerstone for knowledge sharing, innovation and advancing orthopaedic care.</Text>
        <Text style={styles.commonMessage}>As we gather in Guwahati, you will not only have the opportunity to engage with thought leaders and pioneers in
          our field but also experience the warmth and hospitality of this unique region, renowned for its scenic beauty,
          Flora & Fauna, rich traditions, cuisine and diverse culture.</Text>
        <Text style={styles.commonMessage}>The conference promises an enriching experience, featuring insightful keynote addresses, cuttingedge research
          presentations, interactive workshops and ample opportunities to network with colleagues from across the
          globe.</Text>
        <Text style={styles.commonMessage}>Your participation is what makes this event extraordinary, and we are excited to have you join us in celebrating
          this momentous occasion. Together, let us explore new horizons in orthopaedic medicine and forge pathways for a
          brighter future in healthcare.</Text>
        <Text style={styles.commonMessage}>We look forward to welcoming you to Guwahati and sharing an unforgettable journey of learning and
          camaraderie.</Text>
      </View>

      

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
    color: "#000",
    lineHeight: 22,
    textAlign: "justify",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.primary,
    marginBottom: 5,
    textAlign: "center",
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

