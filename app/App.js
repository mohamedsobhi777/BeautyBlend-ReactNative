import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CartScreen, HomeScreen, OnBoarding, ProductScreen } from "./screens";

import "react-native-url-polyfill/auto";
import { Provider } from "react-redux";
import store from "./context/reducers/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomTab from "./components/BottomTab";

const Stack = createNativeStackNavigator();

const MyComponent = ({ setActiveScreen }) => {
    const navigation = useNavigation();
    useEffect(() => {
        const unsubscribe = navigation.addListener("state", () => {
            const currentScreen = navigation.getCurrentRoute().name;
            setActiveScreen(currentScreen);
        });
        return unsubscribe;
    }, [navigation]);
};

const App = () => {
    const [activeScreen, setActiveScreen] = useState("");
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <MyComponent setActiveScreen={setActiveScreen} />
                <Provider store={store}>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen
                            name="OnBoarding"
                            component={OnBoarding}
                        />
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen
                            name="ProductScreen"
                            component={ProductScreen}
                        />
                        <Stack.Screen
                            name="CartScreen"
                            component={CartScreen}
                        />
                    </Stack.Navigator>
                </Provider>
                {activeScreen !== "OnBoarding" && (
                    <BottomTab activeScreen={activeScreen} />
                )}
            </NavigationContainer>
        </GestureHandlerRootView>
    );
};

export default App;
