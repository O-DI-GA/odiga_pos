import React from "react";
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from "react-native";

import OrderList from "../component/OrderList";
import {useNavigation} from "@react-navigation/native";

const Main = () => {
  const navigation = useNavigation()

  const [tableCnt, setTableCnt] = React.useState(0);
  const [orderList, setOrderList] = React.useState([
    {tableId: 1, menu: ["치킨", "소주"], price: 10000},
    {tableId: 3, menu: ["떡볶이", "오뎅탕"], price: 20000},
    {tableId: 8, menu: ["염통 꼬치"], price: 30000},
  ]);
  const [waitingInfo, setWaitingInfo] = React.useState({
    waitingPerson: 4, // 대기인원
    currentNumber: 103 // 현재 번호
  });

  React.useEffect(() => {
    // TODO: 테이블 수 서버에서 가져오기
    setTableCnt(10);
    // TODO: 주문 목록 서버에서 가져오기

    // TODO: 웨이팅 정보 서버에서 가져오기
  }, []);

  const getOrderForTable = (tableId) => {
    return orderList.find(order => order.tableId === tableId);
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
                          order ? styles.occupiedTable : styles.emptyTable
                        ]}
                    >
                      <Text style={styles.tableId}>{tableId}</Text>
                      {order && (
                          <Text style={styles.orderDetails}>
                            {order.menu.join(`\n`)}
                          </Text>
                      )}
                    </View>
                );
              })}
            </View>
          </ScrollView>

          <TouchableOpacity onPress={() => navigation.navigate(`WaitingList`)}>
            <View style={styles.waitingContainer} >
              <View>
                <Text> 웨이팅 현황 </Text>
              </View>
              <View styl={styles.waitingText}>
                <Text> 대기 인원 : {waitingInfo.waitingPerson}</Text>
                <Text> 현재 번호 : {waitingInfo.currentNumber}</Text>
              </View>
            </View>
          </TouchableOpacity>

        </View>

        <View style={styles.rightBox}>
          <OrderList/>
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
    flexDirection : "row",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  leftBox: {
    flex : 4,
  },
  rightBox: {
    flex : 1,
  },
  // 테이블
  tableContainer : {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  table: {
    width: 200,
    height: 200,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth : 0,
    position : 'relative',
  },
  occupiedTable: {
    backgroundColor: '#fff9c4', // 메뉴 있는 테이블
  },
  emptyTable: {
    backgroundColor: '#E7E6E4',
  },
  tableId: {
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor : "#FFD600",
    borderBottomRightRadius : 8,
    borderTopLeftRadius : 8,
    width : 35,
    height : 35,
    textAlign: 'center',
    lineHeight: 35,
  },
  orderDetails: {
    marginTop: 5,
    fontSize: 14,
  },
  // 웨이팅
  waitingContainer: {
    backgroundColor : '#fff',
    borderRadius : 20,
    borderWidth : 0,
    padding : 30,
    marginVertical : 20,
    marginHorizontal : 10,
    display : "flex",
    flexDirection : "row",
    justifyContent : "space-between",
    alignItems : "center",
  },
  waitingText : {
    display : 'flex',
    flexDirection : 'row',
    gap : 10
  }
});

export default Main;
