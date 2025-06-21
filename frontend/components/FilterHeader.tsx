import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  mostrar: boolean;
  onToggle: () => void;
  buscaNome: string;
  onChangeNome: (t: string) => void;
  buscaTipo: string;
  onChangeTipo: (t: string) => void;
  buscaStatus: string;
  onChangeStatus: (t: string) => void;
  buscaConselho: string;
  onChangeConselho: (t: string) => void;
  buscaEspecialidade: string;
  onChangeEspecialidade: (t: string) => void;
  onLimpar: () => void;
  onRecarregar: () => void;
  onGerarPdf: () => void;
};

export function FilterHeader({
  mostrar,
  onToggle,
  buscaNome,
  onChangeNome,
  buscaTipo,
  onChangeTipo,
  buscaStatus,
  onChangeStatus,
  buscaConselho,
  onChangeConselho,
  buscaEspecialidade,
  onChangeEspecialidade,
  onLimpar,
  onRecarregar,
  onGerarPdf,
}: Props) {
  return (
    <View style={{ backgroundColor: "transparent" }}>
      <TouchableOpacity onPress={onToggle} style={styles.filterToggleButton}>
        <Ionicons
          name={mostrar ? "filter" : "filter-outline"}
          size={20}
          color="#333"
        />
        <Text style={styles.filterToggleText}>Filtros</Text>
      </TouchableOpacity>

      {mostrar && (
        <View style={styles.filtrosContainer}>
          <View style={styles.grupoCampos}>
            <View style={styles.campo}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Maria"
                placeholderTextColor="#777"
                value={buscaNome}
                onChangeText={onChangeNome}
              />
            </View>
            <View style={styles.campo}>
              <Text style={styles.label}>Tipo (1-4)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 2"
                placeholderTextColor="#777"
                keyboardType="numeric"
                value={buscaTipo}
                onChangeText={onChangeTipo}
              />
            </View>
            <View style={styles.campo}>
              <Text style={styles.label}>Status (1-3)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 1"
                placeholderTextColor="#777"
                keyboardType="numeric"
                value={buscaStatus}
                onChangeText={onChangeStatus}
              />
            </View>
            <View style={styles.campo}>
              <Text style={styles.label}>Sigla Conselho</Text>
              <TextInput
                style={styles.input}
                placeholder="CRM, COREN..."
                placeholderTextColor="#777"
                autoCapitalize="characters"
                value={buscaConselho}
                onChangeText={onChangeConselho}
              />
            </View>
            <View style={{ width: "100%" }}>
              <Text style={styles.label}>Especialidade</Text>
              <TextInput
                style={[styles.input, { width: "100%" }]}
                placeholder="Nutrição"
                placeholderTextColor="#777"
                value={buscaEspecialidade}
                onChangeText={onChangeEspecialidade}
              />
            </View>
          </View>

          <View style={styles.botoesContainer}>
            <TouchableOpacity
              onPress={onLimpar}
              style={[styles.botaoBase, { backgroundColor: "#f44336" }]}
            >
              <Text style={styles.botaoTexto}>Limpar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onRecarregar}
              style={[styles.botaoBase, { backgroundColor: "#2196f3" }]}
            >
              <Text style={styles.botaoTexto}>Recarregar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onGerarPdf}
              style={[
                styles.botaoBase,
                {
                  backgroundColor: "#4caf50",
                  flexDirection: "row",
                  alignItems: "center",
                },
              ]}
            >
              <Ionicons
                name="document-text-outline"
                size={18}
                color="#fff"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.botaoTexto}>Gerar PDF</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  filtrosContainer: {
    padding: 10,
    backgroundColor: "#f7f7f7",
    borderRadius: 12,
    marginBottom: 12,
  },
  grupoCampos: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  campo: {
    width: "48%",
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    fontSize: 14,
  },
  botoesContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 8,
  },
  botaoBase: {
    justifyContent: "center",
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 18,
    marginLeft: 8,
    height: 40,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  botaoPdfContainer: {
    alignItems: "center",
    marginTop: 14,
  },
  filtrosScroll: {
    marginBottom: 10,
  },
  filterToggleButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    borderRadius: 18,
  },
  filterToggleText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  headerContainer: {
    backgroundColor: "#fff",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
});
