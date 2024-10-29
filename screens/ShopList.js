import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getTokenRequest } from "../utils/api";
import { saveStoreId } from "../utils/tokenUtils";
import messaging from "@react-native-firebase/messaging";

function ShopList() {
  const navigation = useNavigation();
  const [shopList, setShopList] = React.useState([]);

  useEffect(() => {
    const getToken = async () => {
      const token = await messaging().getToken();
      console.log("FCM Token:", token);
      // 서버에 FCM 토큰 전송
    };

    getToken();
  }, []);

  useEffect(() => {
    try {
      const fetchShopList = async () => {
        return await getTokenRequest("/owner/store");
      };
      fetchShopList()
        .then((res) => {
          // console.log(res.data)
          setShopList(res.data);
        })
        .catch((err) => {
          console.log("가게 리스트 요청 오류");
        });
    } catch (error) {}
  }, []);

  // 가게 아이디 저장
  const handleStoreSelect = (storeId) => {
    try {
      saveStoreId(storeId)
        .then((res) => {
          navigation.navigate("Main");
        })
        .catch((err) => {});
    } catch (err) {}
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
    marginVertical: 60,
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "flex-start",
    paddingHorizontal: 60,
    paddingVertical: 10,
    gap: 50,
    marginBottom: 50,
  },
  listCard: {
    backgroundColor: "#ffffff",
    width: 210,
    height: 300,
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
