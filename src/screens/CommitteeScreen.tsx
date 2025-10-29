import React, { useEffect, useState } from "react";
import Screen from "../components/Screen";
import { FlatList, Text, View } from "react-native";
import { getCommittee } from "../api/committee";

export default function CommitteeScreen() {
  const [items,setItems] = useState<any[]>([]);
  useEffect(()=>{ (async()=> setItems(await getCommittee()))(); }, []);
  return (
    <Screen>
      <FlatList
        data={items}
        keyExtractor={(i:any, idx)=>String(idx)}
        renderItem={({ item }) => (
          <View style={{ paddingVertical:10, borderBottomWidth:1, borderColor:"#eee" }}>
            <Text style={{ fontWeight:"700" }}>{item.member_name}</Text>
            <Text style={{ color:"#666" }}>{item.designation}</Text>
            <Text>{item.committee_name}</Text>
          </View>
        )}
      />
    </Screen>
  );
}
