import React from "react";
import {ScrollView, View, StyleSheet, Button, TouchableOpacity} from "react-native";
import {Text} from "react-native";


const OrderList = () => {
    const [orderList, setOlderList] = React.useState([
        {tableId: 2, menu: ["치킨", "소주"], price: 10000},
        {tableId: 5, menu: ["떡볶이", "오뎅탕"], price: 20000},
        {tableId: 1, menu: ["염통 꼬치"], price: 30000},
        {tableId: 4, menu: ["염통 꼬치", "닭 꼬치", "야키토리"], price: 30000},
    ])

    React.useEffect(() => {
        // TODO: 주문 목록 서버에서 가져오기
    }, []);

    const getOrderForTable = (tableId) => {
        return orderList.find(order => order.tableId === tableId);
    };

    // 취소 버튼 핸들러
    const deleteMenu = (tableId) => {
        // TODO : 취소 API 호출
        alert(`${tableId}번 테이블의 주문을 취소하시겠습니까?`);
    };

    // 등록 버튼 핸들러
    const acceptMenu = (tableId) => {
        // TODO : 등록 API 호출
        alert(`${tableId}번 테이블의 주문을 등록하시겠습니까?`);
    };

    return (
        <View style={styles.rightContainer}>
            <Text style={styles.orderText}> 주문목록 </Text>
            <ScrollView>
                <View style={styles.tableContainer}>
                    {Array.from({ length: orderList.length }, (_, i) => {
                        const tableId = i + 1;
                        const order = getOrderForTable(tableId);
                        return (
                            <View
                                key={tableId}
                                style={[
                                    styles.table,styles.occupiedTable
                                ]}
                            >
                                <Text style={styles.tableId}>{tableId}</Text>
                                {order && (
                                    <Text style={styles.orderDetails}>
                                        {order.menu.join(`\n`)}
                                    </Text>
                                )}
                                <View style={styles.buttonBox}>
                                    <TouchableOpacity
                                        style={styles.cancelBtn}
                                        onPress={() => deleteMenu(tableId)}
                                    >
                                        <Text> 취소 </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.acceptBtn}
                                        onPress={() => acceptMenu(tableId)}>
                                        <Text> 확인 </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}

                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    // 주문목록 박스
    rightContainer : {
        backgroundColor : '#fff',
        borderRadius : 10,
        marginTop : 20,
        marginBottom : 30,
        marginHorizontal : 10,
        padding : 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height : '95%',
    },
    // 테이블
    orderText : {
        textAlign : 'center',
        fontSize : 20,
        marginBottom : 10,
    },
    tableContainer : {
        display : "flex",
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent :'space-between',
        alignItems : 'center',
        marginBottom : 10,
    },
    table: {
        width: 200,
        height: 130,
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
    cancelBtn : {
        backgroundColor : "#D9D9D9",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        textAlign : "center"
    },
    acceptBtn : {
        backgroundColor : "#FFD600",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        textAlign : "center"
    },
    buttonBox : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop : 10,
        gap : 10
    }
})

export default OrderList;