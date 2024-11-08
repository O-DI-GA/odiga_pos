import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import OrderList from "../component/OrderList";
import { getTokenRequest, deleteRequest, getToken } from "../utils/api";
import { getStoreId } from "../utils/tokenUtils";

const WaitingList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [waitingList, setWaitingList] = useState(waitingList);
  const [waitingInfo, setWaitingInfo] = useState({
    waitingPerson: 0,
    currentNumber: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchWaitingInfo = async () => {
    try {
      const storeId = await getStoreId();
      if (storeId) {
        const response = await getTokenRequest(`/owner/waiting/${storeId}`);
        if (response.httpStatusCode === 200) {
          const updatedWaitingList = response.data;
          setWaitingList(updatedWaitingList);
          setWaitingInfo({
            waitingPerson: updatedWaitingList.length,
            currentNumber:
              updatedWaitingList.length > 0
                ? updatedWaitingList[0].waitingNumber - 1
                : 0,
          });
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
    fetchWaitingInfo();
  }, []);

  // 모달 오픈 및 메뉴 불러오기
  const onPressModalOpen = async (waitingId) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await getTokenRequest(
        `/owner/waiting/waitingMenuList/${waitingId}`
      );
      if (response.httpStatusCode === 200) {
        const menuData = response.data.map((item) => ({
          menuName: item.menu.menuName,
          count: item.menuCount,
        }));
        setSelectedMenu(menuData);
        setIsModalOpen(true);
      } else {
        console.error(
          "Failed to fetch waiting menu list:",
          response.responseMessage
        );
      }
    } catch (error) {
      console.error("Error fetching menu:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onPressCancel = async (waitingId) => {
    try {
      const token = await getToken();
      const response = await deleteRequest(`user/waiting/${waitingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.httpStatusCode === 200) {
        console.log("웨이팅 취소 성공");
        await fetchWaitingInfo();
      } else {
        console.error("Failed to cancel waiting:", response);
      }
    } catch (error) {
      console.error("Error canceling waiting:", error);
    }
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
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>메뉴</Text>
              <Text style={styles.modalHeaderText}>수량</Text>
            </View>
            {selectedMenu.map((item, index) => (
              <View key={index} style={styles.modalItem}>
                <Text>{item.menuName}</Text>
                <Text>{item.count}</Text>
              </View>
            ))}
            <TouchableOpacity
              onPress={onPressModalClose}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>닫기</Text>
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
            <Text>{item.waitingNumber}</Text>
          </View>
          <Text>{item.userName}님</Text>
        </View>
        <View style={styles.waitingBtnBox}>
          <Text>{item.peopleCount}명</Text>
          <Pressable
            onPress={() => onPressModalOpen(item.waitingId)}
            style={styles.menuButton}
          >
            <Text style={styles.menuButtonText}>메뉴보기</Text>
          </Pressable>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => onPressCancel(item.waitingId)}
          >
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
          <Text>대기 인원 : {waitingInfo?.waitingPerson || 0}명</Text>
          <Text>현재 번호 : {waitingInfo?.currentNumber || 0}번</Text>
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
    width: 250,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    paddingHorizontal: 40,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 30,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
    borderStyle: "dashed",
    paddingBottom: 5,
  },
  modalHeaderText: {
    fontWeight: "bold",
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
