import React from "react";
import { View, Text, StyleSheet, Button, StatusBar } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>홈 화면</Text>
      <Button title="메인 화면" onPress={() => navigation.navigate("Main")} />
      <Button
        title="결제 화면"
        onPress={() => navigation.navigate("Payment")}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default Home;
