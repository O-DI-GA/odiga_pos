import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getTokenRequest, postRequest } from "../utils/api";
import { saveStoreId } from "../utils/tokenUtils";
import messaging from "@react-native-firebase/messaging";

function ShopList() {
  const navigation = useNavigation();
  const [shopList, setShopList] = React.useState([]);

  useEffect(() => {
    const fetchShopList = async () => {
      try {
        const response = await getTokenRequest("/owner/store");
        setShopList(response.data);
      } catch (error) {
        console.log("가게 리스트 요청 오류");
      }
    };

    fetchShopList();
  }, []);

  const handleStoreSelect = async (storeId) => {
    try {
      await saveStoreId(storeId);

      const fcmToken = await messaging().getToken();
      console.log("FCM Token:", fcmToken);

      const data = { fcmToken, storeId };
      const response = await postRequest("/store/fcm", data);
      console.log("서버 응답:", response);

      navigation.navigate("Main");
    } catch (error) {
      console.error("가게 선택 및 FCM 토큰 전송 에러:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}> 가게를 선택해주세요 </Text>
      <ScrollView>
        <View style={styles.listContainer}>
          {shopList && shopList.length === 0 && <Text>가게가 없습니다.</Text>}
          {shopList.map(({ address, phoneNumber, storeId, storeName }) => (
            <TouchableOpacity
              key={storeId}
              style={styles.listCard}
              onPress={() => handleStoreSelect(storeId)}
            >
              <Text style={styles.storeName}> {storeName} </Text>
              <View style={styles.storeInfoBox}>
                <Text style={styles.storeInfo}> {address} </Text>
                <Text style={styles.storeInfo}> {phoneNumber}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F5F0",
    gap: 50,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#424242",
    marginTop: 60,
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "space-around",
    alignItems: "flex-start",
    paddingHorizontal: 60,
    paddingVertical: 0,
    gap: 30,
    marginBottom: 0,
  },
  listCard: {
    backgroundColor: "#ffffff",
    width: 210,
    height: 250,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    elevation: 5,
  },
  storeName: {
    fontSize: 25,
    fontWeight: "bold",
  },
  storeInfoBox: {
    borderTopWidth: 1,
    borderColor: "#aaaaaa",
    width: "100%",
    gap: 5,
    paddingTop: 10,
  },
  storeInfo: {
    fontSize: 13,
  },
});
export default ShopList;
