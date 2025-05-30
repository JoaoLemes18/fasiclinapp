import React from "react";
import { View } from "react-native";
import { Slot } from "expo-router";
import { ProfissionalProvider } from "../context/ProfissionalContext"; // ajuste o caminho conforme sua pasta

const Layout = () => {
  return (
    <ProfissionalProvider>
      <View style={{ flex: 1 }}>
        <Slot />
      </View>
    </ProfissionalProvider>
  );
};

export default Layout;
