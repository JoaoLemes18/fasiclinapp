import React, { useState } from "react";
import { View, Button, Platform, Text } from "react-native";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";

interface DatePickerInputProps {
  date: string;
  onChange: (dateString: string) => void;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  date,
  onChange,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (event: Event, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios"); // fecha picker no Android
    if (selectedDate) {
      onChange(formatDate(selectedDate));
    }
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <Button
        title="Selecionar Data de Nascimento"
        onPress={() => setShowPicker(true)}
      />
      <Text style={{ marginTop: 8 }}>
        Data selecionada: {date || "Nenhuma"}
      </Text>
      {showPicker && (
        <DateTimePicker
          value={date ? new Date(date) : new Date()}
          mode="date"
          display="default"
          onChange={handleChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};

export default DatePickerInput;
