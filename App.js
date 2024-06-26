import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./screens/HomeScreen";
import BinomialScreen from "./screens/BinomialScreen";
import PoissonScreen from "./screens/PoissonScreen";
import NormalScreen from "./screens/NormalScreen";
import StatisticsScreen from "./screens/StatisticsScreen";
import NegativeBinomialScreen from "./screens/NegativeBinomialScreen";
import HypergeometricScreen from "./screens/HypergeometricScreen";
import ExponentialScreen from "./screens/ExponentialScreen";
import JointProbabilityScreen from "./screens/JointProbabilityScreen ";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Binomial" component={BinomialScreen} />
        <Drawer.Screen name="Statistics" component={StatisticsScreen} />
        <Drawer.Screen
          name="NegativeBinomial"
          component={NegativeBinomialScreen}
        />
        <Drawer.Screen name="Hypergeometric" component={HypergeometricScreen} />
        <Drawer.Screen name="Poisson" component={PoissonScreen} />
        <Drawer.Screen name="Normal" component={NormalScreen} />
        <Drawer.Screen name="Exponential" component={ExponentialScreen} />
        <Drawer.Screen name="JointProbability" component={JointProbabilityScreen} />


      </Drawer.Navigator>
    </NavigationContainer>
  );
}

