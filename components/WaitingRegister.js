import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const WaitingRegister = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [peopleCount, setPeopleCount] = useState("");

  const handleRegister = () => {
    console.log("이름:", name);
    console.log("전화번호:", phone);
    console.log("인원 수:", peopleCount);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>웨이팅 등록</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>이름 :</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>전화번호 :</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>인원 수 :</Text>
        <TextInput
          style={styles.input}
          value={peopleCount}
          onChangeText={setPeopleCount}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>등록</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFEF9",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 55,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "80%",
  },
  label: {
    fontSize: 18,
    width: 80,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    marginVertical: 10,
    backgroundColor: "#FFD600",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    width: 100,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default WaitingRegister;
