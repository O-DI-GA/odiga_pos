import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from "./utils/authContext";

import Home from "./screens/Home";
import Login from "./screens/Login";
import Main from "./screens/Main";
import Payment from "./screens/Payment";
import WaitingList from "./screens/WaitingList";

const Stack = createStackNavigator();

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="WaitingList" component={WaitingList} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
