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
import { deleteDataRequest } from "../utils/api";
import { getStoreId } from "../utils/tokenUtils";

const OrderList = ({ fetchOrders }) => {
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
      console.log("받은 FCM 메시지:", remoteMessage.data);

      if (remoteMessage && remoteMessage.data && remoteMessage.data.data) {
        try {
          const type = remoteMessage.data.type;
          const rawData = JSON.parse(remoteMessage.data.data);

          setOrderList((prevOrders) => {
            const updatedOrders = [...prevOrders];
            const existingOrderIndex = updatedOrders.findIndex(
              (order) => order.tableNumber === rawData.tableNumber
            );

            if (existingOrderIndex !== -1) {
              // 기존 항목이 있는 경우 데이터를 병합
              if (type === "call") {
                console.log("직원호출:", rawData);
                updatedOrders[existingOrderIndex] = {
                  ...updatedOrders[existingOrderIndex],
                  data: [
                    ...(updatedOrders[existingOrderIndex].data || []),
                    { menuName: rawData.data, menuCount: "" },
                  ],
                };
              } else if (type === "order") {
                console.log("새 주문:", rawData);
                updatedOrders[existingOrderIndex] = {
                  ...updatedOrders[existingOrderIndex],
                  data: [
                    ...(updatedOrders[existingOrderIndex].data || []),
                    ...rawData.data,
                  ],
                };
              }
            } else {
              // 기존 항목이 없는 경우 새로 추가
              if (type === "call") {
                updatedOrders.push({
                  tableNumber: rawData.tableNumber,
                  data: [{ menuName: rawData.data, menuCount: "" }],
                  type: "call",
                });
              } else if (type === "order") {
                updatedOrders.push({
                  tableNumber: rawData.tableNumber,
                  data: rawData.data,
                  type: "order",
                });
              }
            }

            return updatedOrders;
          });
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
  const deleteMenu = (tableNumber) => {
    Alert.alert(
      `${tableNumber}번 테이블의 주문을 취소하시겠습니까?`,
      "",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "확인",
          onPress: async () => {
            try {
              const storeId = await getStoreId();
              const order = orderList.find(
                (orderItem) => orderItem.tableNumber === tableNumber
              );
              const data = {
                tableOrderMenuforManages: order.data.map((menuItem) => ({
                  menuName: menuItem.menuName,
                  menuCount: Number(menuItem.menuCount),
                })),
              };
              const response = await deleteDataRequest(
                `table/${storeId}/order/${tableNumber}`,
                data
              );
              if (response.httpStatusCode === 201) {
                setOrderList((prevOrders) =>
                  prevOrders.filter(
                    (order) => order.tableNumber !== tableNumber
                  )
                );
                Alert.alert("주문이 취소되었습니다.");
                fetchOrders();
              } else {
                Alert.alert("주문 취소에 실패했습니다.");
              }
            } catch (error) {
              console.error("Error:", error);
              Alert.alert("서버와의 통신에 실패했습니다.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  // 등록 버튼 핸들러
  const acceptMenu = (tableNumber) => {
    Alert.alert(
      `${tableNumber}번 테이블의 주문을 등록하시겠습니까?`,
      "",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "확인",
          onPress: () => {
            fetchOrders();
            setOrderList((prevOrders) =>
              prevOrders.filter((order) => order.tableNumber !== tableNumber)
            );
            Alert.alert("주문이 등록되었습니다.");
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.rightContainer}>
      <Text style={styles.orderText}> 주문목록 </Text>
      <ScrollView>
        <View style={styles.tableContainer}>
          {orderList.length > 0 ? (
            orderList.map((item, index) => (
              <View key={index} style={[styles.table, styles.occupiedTable]}>
                <Text style={styles.tableId}>{item.tableNumber}</Text>
                <View style={styles.orderDetails}>
                  {item.data &&
                    item.data.map((menuItem, idx) => (
                      <Text key={idx}>
                        {menuItem.menuName}
                        {menuItem.menuCount ? ` x ${menuItem.menuCount}` : ""}
                      </Text>
                    ))}
                </View>
                <View style={styles.buttonBox}>
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => deleteMenu(item.tableNumber)}
                  >
                    <Text> 취소 </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.acceptBtn}
                    onPress={() => acceptMenu(item.tableNumber)}
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
