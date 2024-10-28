import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import messaging from "@react-native-firebase/messaging";

const OrderList = () => {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    // 권한 요청
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log("Authorization status:", authStatus);
      } else {
        Alert.alert("FCM 권한이 필요합니다.");
      }
    };

    requestPermission();

    // 포그라운드 메시지 수신 설정
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("받은 FCM 메시지:", remoteMessage);

      if (
        remoteMessage &&
        remoteMessage.notification &&
        remoteMessage.notification.body
      ) {
        try {
          const parsedString = JSON.parse(remoteMessage.notification.body);
          const newOrder = JSON.parse(parsedString);

          setOrderList((prevOrders) => {
            // 동일한 tableId의 주문이 이미 있는지 확인
            const existingOrderIndex = prevOrders.findIndex(
              (order) => order.tableId === newOrder.tableId
            );

            if (existingOrderIndex !== -1) {
              // 기존 주문을 업데이트
              const updatedOrders = [...prevOrders];
              updatedOrders[existingOrderIndex] = newOrder;
              return updatedOrders;
            } else {
              // 새로운 주문을 추가
              return [...prevOrders, newOrder];
            }
          });

          console.log("새 주문:", newOrder);
        } catch (error) {
          console.error("JSON Parse error:", error);
        }
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log("업데이트된 주문 목록:", orderList);
  }, [orderList]);

  const getOrderForTable = (tableId) => {
    return orderList.find((order) => order.tableId === tableId);
  };

  // 취소 버튼 핸들러
  const deleteMenu = (tableId) => {
    // TODO : 취소 API 호출
    Alert.alert(`${tableId}번 테이블의 주문을 취소하시겠습니까?`);
  };

  // 등록 버튼 핸들러
  const acceptMenu = (tableId) => {
    // TODO : 등록 API 호출
    Alert.alert(`${tableId}번 테이블의 주문을 등록하시겠습니까?`);
  };

  return (
    <View style={styles.rightContainer}>
      <Text style={styles.orderText}> 주문목록 </Text>
      <ScrollView>
        <View style={styles.tableContainer}>
          {orderList.length > 0 ? (
            orderList.map((order) => (
              <View
                key={order.tableId}
                style={[styles.table, styles.occupiedTable]}
              >
                <Text style={styles.tableId}>{order.tableId}</Text>
                {order.menu ? (
                  <Text style={styles.orderDetails}>
                    {order.menu.join(`\n`)}
                  </Text>
                ) : (
                  <Text style={styles.orderDetails}>No items</Text>
                )}
                <View style={styles.buttonBox}>
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => deleteMenu(order.tableId)}
                  >
                    <Text> 취소 </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.acceptBtn}
                    onPress={() => acceptMenu(order.tableId)}
                  >
                    <Text> 확인 </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text>새로운 주문이 없습니다.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // 주문목록 박스
  rightContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 30,
    marginHorizontal: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: "95%",
  },
  // 테이블
  orderText: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  },
  tableContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  table: {
    width: 200,
    height: 130,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 0,
    position: "relative",
  },
  occupiedTable: {
    backgroundColor: "#fff9c4", // 메뉴 있는 테이블
  },
  emptyTable: {
    backgroundColor: "#E7E6E4",
  },
  tableId: {
    fontSize: 16,
    fontWeight: "bold",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#FFD600",
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    width: 35,
    height: 35,
    textAlign: "center",
    lineHeight: 35,
  },
  orderDetails: {
    marginTop: 5,
    fontSize: 14,
  },
  cancelBtn: {
    backgroundColor: "#D9D9D9",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    textAlign: "center",
  },
  acceptBtn: {
    backgroundColor: "#FFD600",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    textAlign: "center",
  },
  buttonBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    gap: 10,
  },
});

export default OrderList;
