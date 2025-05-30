import React from "react";
import { TextInput } from "react-native";
import { InputProps } from "../interface/Input";

const Input = ({ ...props }: InputProps) => {
  return (
    <TextInput
      {...props}
      style={{
        backgroundColor: "#f0f0f0", // Cor cinza claro
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        height: 50,
        borderWidth: 0,
        marginBottom: 15,
      }}
      placeholderTextColor="#9e9e9e" // Cor do texto do placeholder
    />
  );
};

export default Input;
