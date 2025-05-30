import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { ButtonProps } from "../interface/Button";

const Button = ({ content, icon, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00a32a", // Cor verde
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 0,
      }}
    >
      <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
        {content}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
