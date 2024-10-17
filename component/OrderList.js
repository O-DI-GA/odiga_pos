import React from "react";
import {ScrollView, View, StyleSheet, Button} from "react-native";
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

    // 취소 버튼
    const deleteMenu = () => {
        // TODO : 취소 API 호출
        alert("취소하시겠습니까? ");
    }

    // 등록버튼
    const acceptMenu = () => {
        // TODO : 등록 API 호출
        alert("등록하시겠습니까? ");
    }

    return (
        <View style={styles.rightContainer}>
            <Text> 주문목록 </Text>
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
                                <View>
                                    <Button title="취소" onPress={deleteMenu}/>
                                    <Button title="확인"/>
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
    tableContainer : {
        flexDirection: 'row',
        flexWrap: 'wrap',
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
})

export default OrderList;