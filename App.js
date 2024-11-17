import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from "./utils/authContext";

import Login from "./screens/Login";
import ShopList from "./screens/ShopList";
import Main from "./screens/Main";
import Payment from "./screens/Payment";
import WaitingList from "./screens/WaitingList";

const Stack = createStackNavigator();

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ShopList"
            component={ShopList}
            options={{
              headerTitle: "",
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              headerTitle: "",
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="Payment"
            component={Payment}
            options={{
              headerTitle: "",
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="WaitingList"
            component={WaitingList}
            options={{
              headerTitle: "",
              headerBackTitleVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
