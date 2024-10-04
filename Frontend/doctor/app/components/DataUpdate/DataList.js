import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

const DataList = ({ data, setDetailsTab }) => {
  const [query, setQuery] = useState("");

  // Filter exercises based on the search query
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          placeholder="Search here..."
          placeholderTextColor={"grey"}
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />
      </View>
      <FlatList
        data={filteredData}
        showsVerticalScrollIndicator={false}
        snapToEnd
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setDetailsTab(true)}>
            <Text style={styles.item}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default DataList;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 30,
    padding: 10,
  },
  item: {
    padding: 12,
  },
});
