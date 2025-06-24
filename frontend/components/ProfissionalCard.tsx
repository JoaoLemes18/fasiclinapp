import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";
import { Profissional } from "@/services/profissionalService";
import { getCodeSpecByIdEspec } from "@/utils/especialidade";

const tipoProfissionalLabel = (codigo: string) => {
  const tipos: Record<string, string> = {
    "1": "Administrativo",
    "2": "Técnico Básico",
    "3": "Supervisor",
    "4": "Master",
  };
  return tipos[codigo] ?? "Desconhecido";
};

const statusProfissionalLabel = (codigo: string) => {
  const status: Record<string, string> = {
    "1": "Ativo",
    "2": "Inativo",
    "3": "Suspenso",
  };
  return status[codigo] ?? "Desconhecido";
};

type Props = {
  profissional: Profissional;
  onEditar: () => void;
  onInativar: () => void;
  onReativar?: () => void;
};

const ProfissionalCard: React.FC<Props> = ({
  profissional,
  onEditar,
  onInativar,
  onReativar, // <- ❗ adicionado aqui
}) => {
  const isInativo = profissional.STATUSPROFI === "2";

  return (
    <View
      style={[
        styles.itemContainer,
        isInativo && styles.cardInativo,
        profissional.STATUSPROFI === "3" && styles.cardSuspenso,
      ]}
    >
      <View style={styles.topo}>
        <Feather name="user" size={20} color="#00A32A" />
        <Text style={styles.itemTitulo}>{profissional.NOMEPESSOA}</Text>
      </View>
      <Text>Tipo: {tipoProfissionalLabel(profissional.TIPOPROFI)}</Text>
      <Text>Status: {statusProfissionalLabel(profissional.STATUSPROFI)}</Text>
      <Text>
        Conselho: {profissional.ABREVCONS ?? "N/A"} -{" "}
        {profissional.DESCRICAO ?? "N/A"}
      </Text>
      <Text>
        Especialidade: {getCodeSpecByIdEspec(profissional.IDESPEC)} -{" "}
        {profissional.DESCESPEC ?? "N/A"}
      </Text>

      <View style={styles.botoesContainer}>
        <TouchableOpacity
          onPress={onEditar}
          style={styles.botao}
          disabled={isInativo}
        >
          <FontAwesome name="edit" size={20} color="#00A32A" />
          <Text style={styles.textoEditar}>Editar</Text>
        </TouchableOpacity>

        {!isInativo && (
          <TouchableOpacity onPress={onInativar} style={styles.botao}>
            <Ionicons name="trash-bin" size={20} color="red" />
            <Text style={styles.textoExcluir}>Inativar</Text>
          </TouchableOpacity>
        )}

        {isInativo && onReativar && (
          <TouchableOpacity onPress={onReativar} style={styles.botao}>
            <Ionicons name="refresh" size={20} color="#007bff" />
            <Text style={styles.textoReativar}>Reativar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  topo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  itemTitulo: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#00a32a",
  },
  cardInativo: {
    opacity: 0.5,
    backgroundColor: "#f8d7da",
  },
  cardSuspenso: {
    opacity: 0.8,
    backgroundColor: "#fff3cd",
  },
  botoesContainer: {
    flexDirection: "row",
    gap: 20,
    marginTop: 10,
  },
  botao: {
    flexDirection: "row",
    alignItems: "center",
  },
  textoEditar: {
    marginLeft: 5,
    color: "#00A32A",
  },
  textoExcluir: {
    marginLeft: 5,
    color: "red",
  },
  textoReativar: {
    marginLeft: 5,
    color: "#007bff",
  },
});

export default ProfissionalCard;
