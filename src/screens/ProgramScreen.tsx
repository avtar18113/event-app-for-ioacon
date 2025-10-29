import React, { useEffect, useState } from "react";
import Screen from "../components/Screen";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { getProgramDays, getProgramByDay, toggleBookmark } from "../api/program";

export default function ProgramScreen({ navigation }: any) {
  const [days, setDays] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { (async () => {
    const d = await getProgramDays();
    setDays(d || []);
    if (d?.length) {
      setSelected(d[0]);
      const list = await getProgramByDay(d[0]);
      setItems(list || []);
    }
    setLoading(false);
  })(); }, []);

  const selectDay = async (day: string) => {
    setSelected(day);
    setLoading(true);
    const list = await getProgramByDay(day);
    setItems(list || []);
    setLoading(false);
  };

  const onToggle = async (item: any) => {
    await toggleBookmark(item.id, !item.is_bookmarked);
    item.is_bookmarked = !item.is_bookmarked;
    setItems([...items]);
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity onPress={() => navigation.navigate("ProgramDetail", { item })} style={{ paddingVertical:10, borderBottomWidth:1, borderColor:"#eee" }}>
      <View style={{ flexDirection:"row", justifyContent:"space-between" }}>
        <Text>{item.hall} • {new Date(item.start_time).toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"})}</Text>
        <Text onPress={() => onToggle(item)}>{item.is_bookmarked ? "★" : "☆"}</Text>
      </View>
      <Text style={{ fontWeight:"700", marginTop:4 }}>{item.topic}</Text>
      {Array.isArray(item.speakers) ? <Text style={{ color:"#666" }}>{item.speakers.join(", ")}</Text> : null}
    </TouchableOpacity>
  );

  return (
    <Screen>
      <FlatList
        ListHeaderComponent={
          <View style={{ flexDirection:"row", flexWrap:"wrap", marginBottom:8 }}>
            {days.map((d) => (
              <TouchableOpacity key={d} onPress={() => selectDay(d)} style={{ paddingVertical:8, paddingHorizontal:12, borderRadius:20, borderWidth:1, borderColor:selected===d?"#1e88e5":"#ddd", marginRight:8, marginBottom:8 }}>
                <Text style={{ color: selected===d ? "#1e88e5" : "#333" }}>{d}</Text>
              </TouchableOpacity>
            ))}
          </View>
        }
        data={items}
        keyExtractor={(i:any) => String(i.id)}
        renderItem={renderItem}
        ListEmptyComponent={loading ? <ActivityIndicator/> : <Text>No sessions</Text>}
      />
    </Screen>
  );
}
