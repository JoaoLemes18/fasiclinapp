import { useEffect, useState } from "react";
import { FlatList, Text, View, ActivityIndicator } from "react-native";
import {
  listarProfissionais,
  Profissional,
} from "@/services/profissionalService";
import { getCodeSpecByIdEspec } from "@/utils/especialidade";

// Funções auxiliares para enums
const tipoProfissionalLabel = (codigo: string) => {
  switch (codigo) {
    case "1":
      return "Administrativo";
    case "2":
      return "Técnico Básico";
    case "3":
      return "Supervisor";
    case "4":
      return "Master";
    default:
      return "Desconhecido";
  }
};

const statusProfissionalLabel = (codigo: string) => {
  switch (codigo) {
    case "1":
      return "Ativo";
    case "2":
      return "Inativo";
    case "3":
      return "Suspenso";
    default:
      return "Desconhecido";
  }
};

export default function List() {
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      const dados = await listarProfissionais();
      setProfissionais(dados);
      setCarregando(false);
    };
    carregar();
  }, []);

  if (carregando) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  return (
    <FlatList
      data={profissionais}
      keyExtractor={(item) => item.IDPROFISSIO.toString()}
      renderItem={({ item }) => (
        <View
          style={{ padding: 12, borderBottomWidth: 1, borderColor: "#ccc" }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "#222" }}>
            {item.NOMEPESSOA ?? "Nome não informado"}
          </Text>
          <Text>Tipo: {tipoProfissionalLabel(item.TIPOPROFI ?? "")}</Text>
          <Text>Status: {statusProfissionalLabel(item.STATUSPROFI ?? "")}</Text>
          <Text>
            Conselho: {item.ABREVCONS ?? "N/A"} -{" "}
            {item.DESCRICAO ?? "Não informado"}
          </Text>

          <Text>
            Especialidade: {getCodeSpecByIdEspec(item.IDESPEC)} -{" "}
            {item.DESCESPEC ?? "Não é necessário"}
          </Text>
        </View>
      )}
      ListEmptyComponent={
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Nenhum profissional encontrado.
        </Text>
      }
    />
  );
}
