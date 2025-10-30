import React, { useEffect, useState } from "react";
import Screen from "../components/Screen";
import { FlatList, TouchableOpacity, Image, Text, View, ActivityIndicator } from "react-native";
import { getDashboard } from "../api/dashboard";

export default function DashboardScreen({ navigation }: any) {
  const [items,setItems] = useState<any[]>([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => { (async () => {
    try { const buttons = await getDashboard(); setItems(buttons); }
    finally { setLoading(false); }
  })(); }, []);

  const onPress = (btn: any) => {
    if (btn.deep_link === "app://faculty") navigation.navigate("Faculty");
    else if (btn.deep_link === "app://committee") navigation.navigate("Committee");
    else if (btn.web_url) navigation.navigate("WebViewPage", { url: btn.web_url, title: btn.label });
  };

  if (loading) return <Screen><ActivityIndicator /></Screen>;

  return (
    <Screen>
      <FlatList
        numColumns={3}
        data={items}
        keyExtractor={(i) => String(i.id)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPress(item)} style={{ flex:1/3, padding:12, alignItems:"center" }}>
            <Image source={{ uri: item.icon_url }} style={{ width:56, height:56, borderRadius:12 }} />
            <Text style={{ marginTop:8, textAlign:"center" }}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </Screen>
  );
}
