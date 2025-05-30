import React, { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet } from "react-native";

interface Profissional {
  cod_prof: string;
  nome_prof: string;
  tipo_prof: string;
  cod_espec: string;
  status_prof: string;
  cons_prof: string;
  email_prof: string;
  motivo_suspensao?: string;
}

interface EditProfissionalModalProps {
  visible: boolean;
  profissional: Profissional | null;
  onClose: () => void;
  onSave: (updatedProf: Profissional) => void;
}

const EditProfissionalModal: React.FC<EditProfissionalModalProps> = ({
  visible,
  profissional,
  onClose,
  onSave,
}) => {
  const [editedProf, setEditedProf] = useState<Profissional | null>(null);

  useEffect(() => {
    setEditedProf(profissional);
  }, [profissional]);

  if (!editedProf) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Editar Profissional</Text>

          <Text style={styles.inputLabel}>Nome</Text>
          <TextInput
            style={styles.input}
            value={editedProf.nome_prof}
            onChangeText={(text) =>
              setEditedProf({ ...editedProf, nome_prof: text })
            }
          />

          <Text style={styles.inputLabel}>Tipo</Text>
          <TextInput
            style={styles.input}
            value={editedProf.tipo_prof}
            onChangeText={(text) =>
              setEditedProf({ ...editedProf, tipo_prof: text })
            }
          />

          <Text style={styles.inputLabel}>Especialidade</Text>
          <TextInput
            style={styles.input}
            value={editedProf.cod_espec}
            onChangeText={(text) =>
              setEditedProf({ ...editedProf, cod_espec: text })
            }
          />

          <Text style={styles.inputLabel}>Status</Text>
          <TextInput
            style={styles.input}
            value={editedProf.status_prof}
            onChangeText={(text) =>
              setEditedProf({ ...editedProf, status_prof: text })
            }
          />

          <Text style={styles.inputLabel}>Conselho de Classe</Text>
          <TextInput
            style={styles.input}
            value={editedProf.cons_prof}
            onChangeText={(text) =>
              setEditedProf({ ...editedProf, cons_prof: text })
            }
          />

          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value={editedProf.email_prof}
            onChangeText={(text) =>
              setEditedProf({ ...editedProf, email_prof: text })
            }
          />

          <Text style={styles.inputLabel}>Motivo da Suspensão</Text>
          <TextInput
            style={styles.input}
            value={editedProf.motivo_suspensao || ""}
            onChangeText={(text) =>
              setEditedProf({ ...editedProf, motivo_suspensao: text })
            }
          />

          <Button
            title="Salvar"
            onPress={() => editedProf && onSave(editedProf)}
          />
          <Button title="Cancelar" onPress={onClose} color="red" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputLabel: {
    marginTop: 10,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default EditProfissionalModal;
