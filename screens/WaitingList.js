import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Modal,
  FlatList,
} from "react-native";
import { StyleSheet } from "react-native";
import OrderList from "../component/OrderList";

const WaitingList = () => {
  const [orderInfo, setOrderInfo] = React.useState([
    { currentNumber: 103, waitingPeople: 5 },
  ]);
  const [waitingList, setWaitingList] = React.useState([
    {
      waitingId: 1,
      waitingNum: 104,
      resName: "김형준",
      peopleCount: 2,
      menu: [
        { menu: "햄버거", count: 10 },
        { menu: "감자튀김", count: 10 },
      ],
    },
    {
      waitingId: 2,
      waitingNum: 105,
      resName: "구자현",
      peopleCount: 1,
      menu: [
        { menu: "치킨버거", count: 1 },
        { menu: "양념감자", count: 1 },
        { menu: "콜라", count: 1 },
      ],
    },
    {
      waitingId: 3,
      waitingNum: 106,
      resName: "김건택",
      peopleCount: 1,
      menu: [
        { menu: "싸이버거", count: 2 },
        { menu: "감자튀김", count: 1 },
        { menu: "콜라", count: 1 },
      ],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedMenu, setSelectedMenu] = React.useState([]);

  // 모달 오픈
  const onPressModalOpen = (menu) => {
    setSelectedMenu(menu);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const onPressModalClose = () => {
    setIsModalOpen(false);
  };

  // 메뉴 모달
  const renderModalContent = () => {
    return (
      <Modal visible={isModalOpen} transparent={true} animationType="slide">
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>주문 내역</Text>
            {selectedMenu.map((item, index) => (
              <View key={index} style={styles.modalItem}>
                <Text>{item.menu}</Text>
                <Text>{item.count}</Text>
              </View>
            ))}
            <TouchableOpacity
              onPress={onPressModalClose}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const renderWaitingItem = ({ item }) => {
    return (
      <View style={styles.waitingItem}>
        <View style={styles.waitingInfo}>
          <View style={styles.waitingNumber}>
            <Text>{item.waitingNum}</Text>
          </View>
          <Text>{item.resName}님</Text>
        </View>
        <View style={styles.waitingBtnBox}>
          <Text>{item.peopleCount}명</Text>
          <Pressable
            onPress={() => onPressModalOpen(item.menu)}
            style={styles.menuButton}
          >
            <Text style={styles.menuButtonText}>메뉴보기</Text>
          </Pressable>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftBox}>
        <View style={styles.header}>
          <Text style={styles.title}>웨이팅 현황</Text>
        </View>
        <View style={styles.status}>
          <Text>대기 인원 : {orderInfo[0].waitingPeople}명</Text>
          <Text>현재 번호 : {orderInfo[0].currentNumber}번</Text>
        </View>
        <FlatList
          data={waitingList}
          renderItem={renderWaitingItem}
          keyExtractor={(item) => item.waitingId.toString()}
        />
        {renderModalContent()}
      </View>
      <View style={styles.rightBox}>
        <OrderList />
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
  leftBox: {
    flex: 4,
    padding: 20,
  },
  rightBox: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  backButton: {
    color: "#333",
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  status: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },
  // 웨이팅 정보
  waitingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    elevation: 1,
    height: 80,
  },
  waitingInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    gap: 20,
  },
  waitingNumber: {
    display: "flex",
    backgroundColor: "#FFF1CE",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    padding: 25,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  waitingBtnBox: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    gap: 50,
    marginRight: 30,
  },
  menuButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  menuButtonText: {
    color: "#9D9D9D",
  },
  cancelButton: {
    backgroundColor: "#ff5c5c",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#fff",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 30,
  },
  modalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 25,
    backgroundColor: "#ff5c5c",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
  },
});

export default WaitingList;
