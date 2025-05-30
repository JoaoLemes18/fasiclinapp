import { FlatList, Text, View } from "react-native";
import { useProfissional } from "../../context/ProfissionalContext";

export default function Second() {
  const { profissionais } = useProfissional();

  return (
    <FlatList
      data={profissionais}
      keyExtractor={(item) => item.id_pessoa.toString()}
      renderItem={({ item }) => (
        <View
          style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}
        >
          <Text style={{ fontWeight: "bold" }}>{item.email_prof}</Text>
          <Text>{item.conselho_prof}</Text>
        </View>
      )}
    />
  );
}
