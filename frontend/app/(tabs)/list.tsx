import { View, ActivityIndicator, Alert } from "react-native";
import { useState } from "react";
import { useProfissionais } from "@/hooks/useProfissionais";
import { styles } from "@/styles/List";

import ProfissionalCard from "@/components/ProfissionalCard";
import { getCodeSpecByIdEspec } from "@/utils/especialidade";
import { gerarProfissionaisPdf } from "@/lib/gerarProfissionaisPdf";
import { FilterHeader } from "@/components/FilterHeader";
import EditProfissionalModal from "@/components/EditModal";
import { FlatList } from "react-native-gesture-handler";

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

export default function List() {
  const [mostrarFiltros, setMostrarFiltros] = useState(false); // ✅ estado para toggle
  const {
    carregando,
    profissionaisFiltrados,
    filtros,
    setFiltros,
    limparFiltros,
    carregar,
    modalAberto,
    profissionalSelecionado,
    abrirModal,
    fecharModal,
    salvarEdicao,
    inativar,
  } = useProfissionais();

  if (carregando) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={profissionaisFiltrados}
        keyExtractor={(item) => item.IDPROFISSIO.toString()}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <FilterHeader
              mostrar={mostrarFiltros}
              onToggle={() => setMostrarFiltros((prev) => !prev)} // ✅ toggle funcional
              buscaNome={filtros.nome}
              onChangeNome={(v) => setFiltros((f) => ({ ...f, nome: v }))}
              buscaTipo={filtros.tipo}
              onChangeTipo={(v) => setFiltros((f) => ({ ...f, tipo: v }))}
              buscaStatus={filtros.status}
              onChangeStatus={(v) => setFiltros((f) => ({ ...f, status: v }))}
              buscaEspecialidade={filtros.especialidade}
              onChangeEspecialidade={(v) =>
                setFiltros((f) => ({ ...f, especialidade: v }))
              }
              onLimpar={limparFiltros}
              onRecarregar={carregar}
              onGerarPdf={() =>
                gerarProfissionaisPdf({
                  profissionais: profissionaisFiltrados,
                  getCodeSpecByIdEspec,
                  tipoProfissionalLabel,
                  statusProfissionalLabel,
                })
              }
            />
          </View>
        }
        renderItem={({ item }) => (
          <ProfissionalCard
            profissional={item}
            onEditar={() => abrirModal(item)}
            onInativar={() => {
              Alert.alert(
                "Inativar Profissional",
                "Deseja inativar este profissional?",
                [
                  { text: "Cancelar", style: "cancel" },
                  {
                    text: "Inativar",
                    style: "destructive",
                    onPress: async () => {
                      const r = await inativar(item.IDPROFISSIO);
                      if (!r.sucesso) alert(r.mensagem);
                    },
                  },
                ]
              );
            }}
          />
        )}
        contentContainerStyle={styles.list}
      />

      <EditProfissionalModal
        visible={modalAberto}
        profissional={profissionalSelecionado}
        onClose={fecharModal}
        onSave={salvarEdicao}
      />
    </View>
  );
}
