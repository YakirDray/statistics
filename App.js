import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./screens/HomeScreen";
import BinomialScreen from "./screens/BinomialScreen";
import PoissonScreen from "./screens/PoissonScreen";
import NormalScreen from "./screens/NormalScreen";
import StatisticsScreen from './screens/StatisticsScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen
          name="Binomial Distribution"
          component={BinomialScreen}
        />
        <Drawer.Screen name="Statistics" component={StatisticsScreen} />

        <Drawer.Screen name="Poisson Distribution" component={PoissonScreen} />
        <Drawer.Screen name="Normal Distribution" component={NormalScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
