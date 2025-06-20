import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegisterScreen from "./register";
import Secound from "./list";
import { Ionicons } from "react-native-vector-icons";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Cadastro de Profissional" // <- aqui define a primeira tela
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Cadastro de Profissional") {
            iconName = focused ? "person-add" : "person-add-outline";
          } else if (route.name === "Profissionais Cadastrados") {
            iconName = focused ? "people" : "people-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#00A32A",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Cadastro de Profissional" component={RegisterScreen} />
      <Tab.Screen name="Profissionais Cadastrados" component={Secound} />
    </Tab.Navigator>
  );
};

export default Tabs;
