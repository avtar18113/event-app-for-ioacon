import React from "react";
import Screen from "../components/Screen";
import { Text, View } from "react-native";

export default function ProgramDetailScreen({ route }: any) {
  const { item } = route.params;
  return (
    <Screen>
      <Text style={{ fontSize:18, fontWeight:"800" }}>{item.topic}</Text>
      <Text style={{ marginTop:8 }}>{item.hall}</Text>
      <Text>{new Date(item.start_time).toLocaleString()}</Text>
      <View style={{ marginTop:12 }}>
        {Array.isArray(item.speakers) ? <Text>Speakers: {item.speakers.join(", ")}</Text> : null}
        {item.description ? <Text style={{ marginTop:8 }}>{item.description}</Text> : null}
      </View>
    </Screen>
  );
}
