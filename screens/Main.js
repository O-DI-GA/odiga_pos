import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Main = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Main;