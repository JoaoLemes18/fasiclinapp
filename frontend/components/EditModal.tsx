import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Profissional } from "@/services/profissionalService";
import { buscarConselhos, Conselho } from "@/services/conselhoService";
import { obterIdConselhoPorEspecialidade } from "@/utils/mapaEspecialidade";
import {
  buscarEspecialidades,
  Especialidade,
} from "@/services/especialidadeService";

interface EditProfissionalModalProps {
  visible: boolean;
  profissional: Profissional | null;
  onClose: () => void;
  onSave: (id: number, updatedData: any) => void;
}

const tipos = [
  { label: "Administrativo", value: "1" },
  { label: "Técnico Básico", value: "2" },
  { label: "Supervisor", value: "3" },
  { label: "Master", value: "4" },
];

const statusOptions = [
  { label: "Ativo", value: "1" },
  { label: "Inativo", value: "2" },
  { label: "Suspenso", value: "3" },
];

const EditProfissionalModal: React.FC<EditProfissionalModalProps> = ({
  visible,
  profissional,
  onClose,
  onSave,
}) => {
  const [tipo, setTipo] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [conselho, setConselho] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [senha, setSenha] = useState("");
  const [conselhosFiltrados, setConselhosFiltrados] = useState<Conselho[]>([]);
  const [conselhos, setConselhos] = useState<Conselho[]>([]);
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);

  useEffect(() => {
    if (profissional) {
      setTipo(profissional.TIPOPROFI);
      setStatus(profissional.STATUSPROFI);
      setEmail(profissional.LOGUSUARIO || "");
      setConselho(profissional.IDCONSEPROFI?.toString() || "");
      setEspecialidade(profissional.IDESPEC?.toString() || "");
      setSenha("");
    }
  }, [profissional]);

  useEffect(() => {
    const carregarDados = async () => {
      const conselhosData = await buscarConselhos();
      const especialidadesData = await buscarEspecialidades();
      setConselhos(conselhosData);
      setEspecialidades(especialidadesData);
    };
    carregarDados();
  }, []);

  useEffect(() => {
    if (especialidade) {
      const idConselhoRelacionado = obterIdConselhoPorEspecialidade(
        Number(especialidade)
      );
      if (idConselhoRelacionado) {
        const filtrado = conselhos.filter(
          (c) => c.IDCONSEPROFI === idConselhoRelacionado
        );
        setConselhosFiltrados(filtrado);
      } else {
        setConselhosFiltrados([]);
      }
    }
  }, [especialidade, conselhos]);

  const handleSalvar = () => {
    if (!profissional) return;

    const payload = {
      tipoProf: tipo,
      statusProf: status,
      emailProf: email,
      senhaProf: senha,
    };

    if (tipo !== "1" && tipo !== "4") {
      Object.assign(payload, {
        conselhoProf: conselho,
        codEspec: especialidade,
      });
    }

    onSave(profissional.IDPROFISSIO, payload);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.keyboardView}
        >
          <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <Text style={styles.title}>Editar Profissional</Text>

              <Text style={styles.label}>Tipo</Text>
              <View style={styles.toggleGroup}>
                {tipos.map((t) => (
                  <TouchableOpacity
                    key={t.value}
                    style={[
                      styles.toggleButton,
                      tipo === t.value && styles.selectedButton,
                    ]}
                    onPress={() => setTipo(t.value)}
                  >
                    <Text style={styles.toggleText}>{t.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Status</Text>
              <View style={styles.toggleGroup}>
                {statusOptions.map((s) => (
                  <TouchableOpacity
                    key={s.value}
                    style={[
                      styles.toggleButton,
                      status === s.value && styles.selectedButton,
                    ]}
                    onPress={() => setStatus(s.value)}
                  >
                    <Text style={styles.toggleText}>{s.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email do profissional"
              />

              <Text style={styles.label}>Nova Senha</Text>
              <TextInput
                style={styles.input}
                value={senha}
                onChangeText={setSenha}
                placeholder="Deixe em branco para manter"
                secureTextEntry
              />

              {tipo !== "1" && tipo !== "4" && (
                <>
                  <Text style={styles.label}>Especialidade</Text>
                  <View style={styles.toggleGroup}>
                    {especialidades.map((e) => (
                      <TouchableOpacity
                        key={e.IDESPEC}
                        style={[
                          styles.toggleButton,
                          especialidade === String(e.IDESPEC) &&
                            styles.selectedButton,
                        ]}
                        onPress={() => setEspecialidade(String(e.IDESPEC))}
                      >
                        <Text style={styles.toggleText}>
                          {e.CODESPEC} - {e.DESCESPEC}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={styles.label}>Conselho</Text>
                  <View style={styles.toggleGroup}>
                    {conselhosFiltrados.map((c) => (
                      <TouchableOpacity
                        key={c.IDCONSEPROFI}
                        style={[
                          styles.toggleButton,
                          conselho === String(c.IDCONSEPROFI) &&
                            styles.selectedButton,
                        ]}
                        onPress={() => setConselho(String(c.IDCONSEPROFI))}
                      >
                        <Text style={styles.toggleText}>
                          {c.ABREVCONS} - {c.DESCRICAO}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}
            </ScrollView>

            <View style={styles.footer}>
              <Button title="Salvar" onPress={handleSalvar} />
              <View style={{ height: 10 }} />
              <Button title="Cancelar" color="red" onPress={onClose} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardView: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    height: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 10,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 30,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
  toggleGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 5,
  },
  toggleButton: {
    backgroundColor: "#6C757D",
    padding: 8,
    borderRadius: 12,
    margin: 5,
  },
  selectedButton: {
    backgroundColor: "#00a32a",
  },
  toggleText: {
    color: "white",
  },
});

export default EditProfissionalModal;
