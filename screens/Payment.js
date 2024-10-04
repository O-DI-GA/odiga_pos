import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Payment = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.xButton}>
        <Text style={styles.xText}>X</Text>
      </TouchableOpacity>
      <View style={styles.orderContainer}>
        <View>
          <Text style={styles.title}>주문 내역</Text>
          <View style={styles.orderDetailContainer}>
            <Text>메뉴</Text>
            <Text>수량</Text>
            <Text>가격</Text>
          </View>

          <View style={styles.orderDetailContainer}>
            <Text>햄버거</Text>
            <Text>10</Text>
            <Text>50,000</Text>
          </View>
          <View style={styles.orderDetailContainer}>
            <Text>햄버거</Text>
            <Text>10</Text>
            <Text>50,000</Text>
          </View>
          <View style={styles.orderDetailContainer}>
            <Text>햄버거</Text>
            <Text>10</Text>
            <Text>50,000</Text>
          </View>
          <View style={styles.orderDetailContainer}>
            <Text>햄버거</Text>
            <Text>10</Text>
            <Text>50,000</Text>
          </View>
        </View>
        <View style={styles.orderSum}>
          <Text style={styles.sumText}>합계</Text>
          <Text style={styles.sumText}>200,000원</Text>
        </View>
      </View>
      <View style={styles.tableNumContainer}>
        <Text style={styles.tableNumTitle}>테이블 번호</Text>
        <Text style={styles.tableNum}>3</Text>
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payButtonText}>결제</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7F5F0",
  },
  xButton: {
    position: "absolute",
    top: 50,
    left: 50,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    borderStyle: "dashed",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
  },
  xText: {
    fontSize: 20,
  },
  title: {
    fontSize: 24,
    paddingHorizontal: 80,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
    borderStyle: "dashed",
  },
  orderContainer: {
    backgroundColor: "#fff",
    padding: 30,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    height: "70%",
    justifyContent: "space-between",
    elevation: 3,
  },
  orderDetailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  orderSum: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderTopWidth: 2,
    borderTopColor: "#ddd",
    borderStyle: "dashed",
  },
  sumText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  tableNumContainer: {
    position: "relative",
    alignItems: "center",
    height: "70%",
    gap: 20,
  },
  tableNumTitle: {
    fontSize: 25,
    paddingTop: 90,
  },
  tableNum: {
    fontSize: 80,
  },
  payButton: {
    backgroundColor: "#FFD600",
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    position: "absolute",
    bottom: 0,

    alignItems: "center",
    justifyContent: "center",
  },
  payButtonText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Payment;
