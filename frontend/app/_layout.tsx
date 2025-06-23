import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Slot } from "expo-router";
import { ProfissionalProvider } from "../context/ProfissionalContext";

const Layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ProfissionalProvider>
        <Slot />
      </ProfissionalProvider>
    </GestureHandlerRootView>
  );
};

export default Layout;
