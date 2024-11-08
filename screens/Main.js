import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import OrderList from "../component/OrderList";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getRequest, getTokenRequest } from "../utils/api";
import { getStoreId } from "../utils/tokenUtils";

const Main = () => {
  const navigation = useNavigation();

  const [tableCnt, setTableCnt] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const [waitingInfo, setWaitingInfo] = useState({
    waitingPerson: 0,
    currentNumber: 0,
  });

  const fetchOrders = async () => {
    try {
      const storeId = await getStoreId();
      if (storeId) {
        console.log(`Fetched Store ID: ${storeId}`);

        // TODO: 테이블 수 서버에서 가져오기
        setTableCnt(10);

        const response = await getRequest(`/table/${storeId}/order`);
        if (response?.httpStatusCode === 201) {
          const formattedOrders = response.data.map((order) => ({
            tableId: order.tableNumber,
            menu: order.tableOrderMenus.map(
              (menu) => `${menu.menuName} x${menu.menuCount}`
            ),
            price: order.totalTableOrderPrice,
          }));
          setOrderList(formattedOrders);
          console.log("테이블 별 주문내역 새로 불러오기 성공");
        } else {
          console.error(
            "Failed to fetch order list:",
            response.responseMessage
          );
        }
      } else {
        console.log("Store ID가 없습니다.");
      }
    } catch (error) {
      console.error("Error initializing data:", error);
    }
  };

  const fetchWaitingInfo = async () => {
    try {
      const storeId = await getStoreId();
      if (storeId) {
        const response = await getTokenRequest(`/owner/waiting/${storeId}`);
        if (response.httpStatusCode === 200) {
          const waitingList = response.data;
          setWaitingInfo({
            waitingPerson: waitingList.length > 0 ? waitingList.length : 0,
            currentNumber:
              waitingList.length > 0 ? waitingList[0].waitingNumber - 1 : 0,
          });
          console.log("waiting info:", waitingInfo);
        } else {
          console.error(
            "Failed to fetch waiting info:",
            response.responseMessage
          );
        }
      } else {
        console.log("Store ID가 없습니다.");
      }
    } catch (error) {
      console.error("Error fetching waiting info:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchWaitingInfo();
  }, []);

  // Main 화면에 포커스가 돌아올 때마다 fetchWaitingInfo 호출
  useFocusEffect(
    useCallback(() => {
      fetchWaitingInfo();
    }, [])
  );

  const getOrderForTable = (tableId) => {
    return orderList.find((order) => order.tableId === tableId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftBox}>
        <ScrollView>
          <View style={styles.tableContainer}>
            {Array.from({ length: tableCnt }, (_, i) => {
              const tableId = i + 1;
              const order = getOrderForTable(tableId);
              return (
                <View
                  key={tableId}
                  style={[
                    styles.table,
                    order ? styles.occupiedTable : styles.emptyTable,
                  ]}
                >
                  <Text style={styles.tableId}>{tableId}</Text>
                  {order && (
                    <>
                      <Text style={styles.orderDetails}>
                        {order.menu.join(`\n`)}
                      </Text>
                      <Text style={styles.orderPrice}>
                        {order.price.toLocaleString()}원
                      </Text>
                    </>
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>

        <TouchableOpacity onPress={() => navigation.navigate("WaitingList")}>
          <View style={styles.waitingContainer}>
            <View>
              <Text> 웨이팅 현황 </Text>
            </View>
            <View style={styles.waitingText}>
              <Text> 대기 인원 : {waitingInfo.waitingPerson}</Text>
              <Text> 현재 번호 : {waitingInfo.currentNumber}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.rightBox}>
        <OrderList fetchOrders={fetchOrders} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7F5F0",
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  leftBox: {
    flex: 4,
  },
  rightBox: {
    flex: 1,
  },
  // 테이블
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 70,
  },
  table: {
    width: 200,
    height: 200,
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
    position: "absolute",
    top: 50,
    left: 50,
    marginTop: 5,
    fontSize: 20,
  },
  orderPrice: {
    position: "absolute",
    bottom: 15,
    right: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  // 웨이팅
  waitingContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 0,
    padding: 30,
    marginVertical: 20,
    marginHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  waitingText: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
});

export default Main;
