import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./screens/Home";
import Main from "./screens/Main";
import Payment from "./screens/Payment";
import WaitingList from "./screens/WaitingList";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="WaitingList" component={WaitingList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
