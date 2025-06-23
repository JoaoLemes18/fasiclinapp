import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFiltros } from "@/hooks/useFiltros";

type Props = {
  mostrar: boolean;
  onToggle: () => void;
  buscaNome: string;
  onChangeNome: (t: string) => void;
  buscaTipo: string;
  onChangeTipo: (t: string) => void;
  buscaStatus: string;
  onChangeStatus: (t: string) => void;
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
  buscaEspecialidade,
  onChangeEspecialidade,
  onLimpar,
  onRecarregar,
  onGerarPdf,
}: Props) {
  const { especialidades } = useFiltros();

  return (
    <View>
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
          {/* Campo Nome centralizado */}
          <View style={{ alignItems: "center", marginBottom: 16 }}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={[styles.input, { width: "90%", textAlign: "center" }]}
              placeholder="Digite o nome..."
              placeholderTextColor="#777"
              value={buscaNome}
              onChangeText={onChangeNome}
            />
          </View>

          {/* Filtros por chips */}
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.label}>Tipo</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 6 }}
            >
              {[
                ["", "Todos"],
                ["1", "Administrativo"],
                ["2", "Técnico"],
                ["3", "Supervisor"],
                ["4", "Master"],
              ].map(([valor, label]) => (
                <TouchableOpacity
                  key={valor}
                  style={[
                    styles.chip,
                    buscaTipo === valor && styles.chipSelecionado,
                  ]}
                  onPress={() => onChangeTipo(valor)}
                >
                  <Text style={styles.chipTexto}>{label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={styles.label}>Status</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 6 }}
            >
              {[
                ["", "Todos"],
                ["1", "Ativo"],
                ["2", "Inativo"],
                ["3", "Suspenso"],
              ].map(([valor, label]) => (
                <TouchableOpacity
                  key={valor}
                  style={[
                    styles.chip,
                    buscaStatus === valor && styles.chipSelecionado,
                  ]}
                  onPress={() => onChangeStatus(valor)}
                >
                  <Text style={styles.chipTexto}>{label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={styles.label}>Especialidade</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 6 }}
            >
              <TouchableOpacity
                style={[
                  styles.chip,
                  buscaEspecialidade === "" && styles.chipSelecionado,
                ]}
                onPress={() => onChangeEspecialidade("")}
              >
                <Text style={styles.chipTexto}>Todas</Text>
              </TouchableOpacity>

              {especialidades.map((item) => (
                <TouchableOpacity
                  key={item.IDESPEC}
                  style={[
                    styles.chip,
                    buscaEspecialidade === String(item.IDESPEC) &&
                      styles.chipSelecionado,
                  ]}
                  onPress={() => onChangeEspecialidade(String(item.IDESPEC))}
                >
                  <Text style={styles.chipTexto}>
                    {item.CODESPEC} - {item.DESCESPEC}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Botões de ação */}
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
    padding: 12,

    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
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
    backgroundColor: "#f3f6f9",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    fontSize: 14,
    color: "#333",
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#e0f2f1",
    marginRight: 8,
  },
  chipSelecionado: {
    backgroundColor: "#00796b",
  },
  chipTexto: {
    fontSize: 13,
    color: "#004d40",
    fontWeight: "500",
  },
  botoesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 16,
    justifyContent: "space-between", // MELHOR alinhamento
  },

  botaoBase: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: 10,
    height: 42,
    minWidth: 100, // evita ficar muito estreito
  },

  botaoTexto: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  filterToggleButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#e0f2f1",
  },
  filterToggleText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "600",
    color: "#004d40",
  },
});
