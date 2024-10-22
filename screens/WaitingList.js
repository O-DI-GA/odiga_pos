import React from "react";
import { View, Text, TouchableOpacity, Pressable, Modal, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import OrderList from "../component/OrderList";

const WaitingList = () => {
  const [orderInfo, setOrderInfo] = React.useState([{ currentNumber: 103, waitingPeople: 5 }]);

  const [waitingList, setWaitingList] = React.useState([
    {
      waitingId: 1,
      waitingNum: 104,
      resName: "김형준 님",
      peopleCount: 3,
      menu: [
        { menu: "햄버거", count: 10 },
        { menu: "감자튀김", count: 10 },
      ],
    },
    {
      waitingId: 2,
      waitingNum: 105,
      resName: "구자현 님",
      peopleCount: 3,
      menu: [
        { menu: "치킨버거", count: 1 },
        { menu: "양념감자", count: 1 },
        { menu: "콜라", count: 1 },
      ],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedMenu, setSelectedMenu] = React.useState([]);

  const onPressModalOpen = (menu) => {
    setSelectedMenu(menu);
    setIsModalOpen(true);
  };

  const onPressModalClose = () => {
    setIsModalOpen(false);
  };

  const renderModalContent = () => {
    return (
        <Modal visible={isModalOpen} transparent={true} animationType="slide">
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>메뉴</Text>
              {selectedMenu.map((item, index) => (
                  <View key={index} style={styles.modalItem}>
                    <Text>{item.menu}</Text>
                    <Text>{item.count}</Text>
                  </View>
              ))}
              <TouchableOpacity onPress={onPressModalClose} style={styles.closeButton}>
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
            <Text>{item.waitingId}</Text>
            <Text>{item.resName}</Text>
            <Text>{item.peopleCount}명</Text>
          </View>
          <Pressable onPress={() => onPressModalOpen(item.menu)} style={styles.menuButton}>
            <Text style={styles.menuButtonText}>메뉴보기</Text>
          </Pressable>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>취소</Text>
          </TouchableOpacity>
        </View>
    );
  };

  return (
      <View style={styles.container}>
        <View style={styles.leftBox}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Text style={styles.backButton}>이전 버튼</Text>
          </TouchableOpacity>
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
  leftBox: {
    flex : 4,
    padding : 15,
  },
  rightBox: {
    flex : 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  backButton: {
    color: '#333',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  status: {
    marginBottom: 20,
  },
  waitingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 1,
  },
  waitingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    backgroundColor: '#d9d9d9',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  menuButtonText: {
    color: '#333',
  },
  cancelButton: {
    backgroundColor: '#ff5c5c',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ff5c5c',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
  },
});

export default WaitingList;