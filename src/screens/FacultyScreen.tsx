import React, { useEffect, useState } from "react";
import Screen from "../components/Screen";
import { FlatList, Image, Text, View } from "react-native";
import { getFaculty } from "../api/faculty";
import { colors } from "../theme/colors";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function FacultyScreen() {
  const [items,setItems] = useState<any[]>([]);
  useEffect(() => { (async () => setItems(await getFaculty()))(); }, []);
  return (
    <Screen>
      <SafeAreaProvider>
      <FlatList
        data={items}
        keyExtractor={(i:any)=>String(i.id)}
        renderItem={({ item }) => (
          <View style={{ flexDirection:"row", paddingVertical:10, borderBottomWidth:1, borderColor:"#eee" }}>
            <Image source={{ uri: item.photo_url }} style={{ width:56, height:56, borderRadius:28, marginRight:12 }} />
            <View style={{ flex:1 }}>
              <Text style={{ fontWeight:"700" }}>{item.name}</Text>
              <Text>{item.designation}{item.organization ? `, ${item.organization}` : ""}</Text>
              <Text style={{ color:"#666" }}>{[item.city, item.country].filter(Boolean).join(", ")}</Text>
            </View>
          </View>
        )}
      />
      </SafeAreaProvider>
    </Screen>
  );
}
