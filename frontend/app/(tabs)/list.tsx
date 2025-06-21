import { useEffect, useState } from "react";
import { FlatList, Text, View, ActivityIndicator } from "react-native";
import { styles } from "@/styles/List";
import {
  listarProfissionais,
  Profissional,
} from "@/services/profissionalService";
import { getCodeSpecByIdEspec } from "@/utils/especialidade";
import { gerarProfissionaisPdf } from "@/lib/gerarProfissionaisPdf";
import { FilterHeader } from "@/components/FilterHeader";

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
  const [mostrarFiltros, setMostrarFiltros] = useState(true);

  const [buscaNome, setBuscaNome] = useState("");
  const [buscaTipo, setBuscaTipo] = useState("");
  const [buscaStatus, setBuscaStatus] = useState("");
  const [buscaConselho, setBuscaConselho] = useState("");
  const [buscaEspecialidade, setBuscaEspecialidade] = useState("");

  const carregar = async () => {
    setCarregando(true);
    const dados = await listarProfissionais();
    setProfissionais(dados);
    setCarregando(false);
  };

  useEffect(() => {
    carregar();
  }, []);

  const limparFiltros = () => {
    setBuscaNome("");
    setBuscaTipo("");
    setBuscaStatus("");
    setBuscaConselho("");
    setBuscaEspecialidade("");
  };

  const profissionaisFiltrados = profissionais.filter((p) => {
    const nomeOk = p.NOMEPESSOA?.toLowerCase().includes(
      buscaNome.toLowerCase()
    );
    const tipoOk = buscaTipo ? p.TIPOPROFI === buscaTipo : true;
    const statusOk = buscaStatus ? p.STATUSPROFI === buscaStatus : true;
    const conselhoOk = buscaConselho
      ? p.ABREVCONS?.toLowerCase().includes(buscaConselho.toLowerCase())
      : true;
    const especOk = buscaEspecialidade
      ? p.DESCESPEC?.toLowerCase().includes(buscaEspecialidade.toLowerCase())
      : true;
    return nomeOk && tipoOk && statusOk && conselhoOk && especOk;
  });

  if (carregando) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  // Wrap header in white container so button stays clear and fixed
  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <FilterHeader
        mostrar={mostrarFiltros}
        onToggle={() => setMostrarFiltros((prev) => !prev)}
        buscaNome={buscaNome}
        onChangeNome={setBuscaNome}
        buscaTipo={buscaTipo}
        onChangeTipo={setBuscaTipo}
        buscaStatus={buscaStatus}
        onChangeStatus={setBuscaStatus}
        buscaConselho={buscaConselho}
        onChangeConselho={setBuscaConselho}
        buscaEspecialidade={buscaEspecialidade}
        onChangeEspecialidade={setBuscaEspecialidade}
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
  );

  return (
    <View>
      <FlatList
        data={profissionaisFiltrados}
        keyExtractor={(item) => item.IDPROFISSIO.toString()}
        ListHeaderComponent={ListHeader}
        stickyHeaderIndices={[0]}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitulo}>{item.NOMEPESSOA}</Text>
            <Text>Tipo: {tipoProfissionalLabel(item.TIPOPROFI)}</Text>
            <Text>Status: {statusProfissionalLabel(item.STATUSPROFI)}</Text>
            <Text>
              Conselho: {item.ABREVCONS ?? "N/A"} - {item.DESCRICAO ?? "N/A"}
            </Text>
            <Text>
              Especialidade: {getCodeSpecByIdEspec(item.IDESPEC)} -{" "}
              {item.DESCESPEC ?? "N/A"}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Nenhum profissional encontrado.
          </Text>
        }
      />
    </View>
  );
}
