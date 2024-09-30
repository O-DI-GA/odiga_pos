import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CurrentNum = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.current}>현재 </Text>
      <Text style={styles.num}> 1 번</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFF9C4",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  current: {
    fontSize: 35,
    paddingTop: 20,
  },
  num: {
    fontSize: 80,
    fontWeight: "bold",
  },
});

export default CurrentNum;
