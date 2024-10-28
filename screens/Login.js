import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loginAPI } from "../utils/useAuthUtils";
import { useAuth } from "../utils/authContext";
function Login() {
  const navigation = useNavigation();
  const { setIsLogged } = useAuth();
  // 로그인 정보
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });
  const handleInputChange = (field, value) => {
    setLoginData((prevLogin) => ({
      ...prevLogin,
      [field]: value,
    }));
  };
  // 로그인 API
  const handleLogin = async () => {
    const response = await loginAPI(loginData, setIsLogged);
    if (response === "success") {
      navigation.navigate("Main");
    }
    if (response === "fail") {
      Alert.alert("로그인 실패", "아이디 또는 비밀번호를 다시 확인하세요.");
    }
  };
  return (
    <View style={styles.container}>
      {/*가운데 맞춤*/}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}> 로그인 </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}> 이메일 </Text>
          <TextInput
            style={styles.inputBox}
            placeholder="이메일을 입력해주세요"
            placeholderTextColor="#97A2B0"
            value={loginData.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
          <Text style={styles.inputLabel}> 비밀번호 </Text>
          <TextInput
            style={styles.inputBox}
            secureTextEntry={true}
            placeholder="비밀번호를 입력해주세요"
            placeholderTextColor="#97A2B0"
            value={loginData.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text> 로그인하기 </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F5F0",
  },
  loginContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    borderRadius: 20,
    paddingHorizontal: 90,
    paddingVertical: 60,
    backgroundColor: "#ffffff",
  },
  loginText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#424242",
    marginBottom: 40,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: "#424242",
    marginBottom: 10,
  },
  inputBox: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#FFF1CE",
    paddingHorizontal: 15,
    marginBottom: 20,
    marginTop: 10,
  },
  loginButton: {
    borderRadius: 10,
    backgroundColor: "#FFD600",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "#424242",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default Login;
