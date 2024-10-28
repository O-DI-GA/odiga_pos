import AsyncStorage from "@react-native-async-storage/async-storage";

// 토큰 저장
export const storeTokens = async (accessToken, refreshToken) => {
  try {
    await AsyncStorage.setItem(
      "tokens",
      JSON.stringify({
        accessToken,
        refreshToken,
      })
    );
  } catch (err) {
    console.log("토큰 저장 오류 : ", err);
  }
};

// 토큰 가져오기
export const getTokenFromStorage = async () => {
  try {
    const value = await AsyncStorage.getItem("tokens");
    if (value !== null) {
      const tokens = JSON.parse(value);
      const { accessToken } = tokens;
      return accessToken;
    } else {
      console.log("토큰 존재 X : return null");
      return null;
    }
  } catch (err) {
    console.log("토큰 가져오기 오류 : ", err);
  }
};

// 토큰 제거
export const removeTokens = async () => {
  try {
    await AsyncStorage.removeItem("tokens");
  } catch (err) {
    console.log("토큰 제거 오류 : ", err);
  }
};

// 가게 아이디 저장
export const saveStoreId = async (storeId) => {
  try {
    await AsyncStorage.setItem("storeId", storeId.toString());
    console.log(`StoreId : ${storeId} 저장 성공`);
  } catch (err) {
    console.log("StoreId 저장 오류: ", err);
  }
};
