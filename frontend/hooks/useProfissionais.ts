import { useEffect, useState } from "react";
import {
  listarProfissionais,
  atualizarProfissional,
  reativarProfissional,
  inativarProfissional, // <- alterado aqui
  Profissional,
  ProfissionalCadastro,
} from "@/services/profissionalService";

// Tipagem para filtros
type Filtros = {
  nome: string;
  tipo: string;
  status: string;
  especialidade: string;
};

export function useProfissionais() {
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [profissionalSelecionado, setProfissionalSelecionado] =
    useState<Profissional | null>(null);

  const [filtros, setFiltros] = useState<Filtros>({
    nome: "",
    tipo: "",
    status: "",
    especialidade: "",
  });

  // Carrega os profissionais do backend
  const carregar = async () => {
    setCarregando(true);
    try {
      const dados = await listarProfissionais();
      setProfissionais(dados);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  // Filtro aplicado localmente
  const profissionaisFiltrados = profissionais.filter((p) => {
    return (
      p.NOMEPESSOA?.toLowerCase().includes(filtros.nome.toLowerCase()) &&
      (filtros.tipo ? p.TIPOPROFI === filtros.tipo : true) &&
      (filtros.status ? p.STATUSPROFI === filtros.status : true) &&
      (filtros.especialidade
        ? String(p.IDESPEC) === filtros.especialidade
        : true)
    );
  });

  // Modal de edição
  const abrirModal = (prof: Profissional) => {
    setProfissionalSelecionado(prof);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setProfissionalSelecionado(null);
  };

  // Salvar edição com ID da pessoa física atual
  const salvarEdicao = async (
    id: number,
    dados: Omit<ProfissionalCadastro, "idPessoa">
  ) => {
    if (!profissionalSelecionado?.ID_PESSOAFIS) {
      return {
        sucesso: false,
        mensagem: "Profissional não selecionado corretamente.",
      };
    }

    const resultado = await atualizarProfissional(id, {
      ...dados,
      idPessoa: profissionalSelecionado.ID_PESSOAFIS,
    });

    if (resultado.sucesso) {
      await carregar();
    }

    return resultado;
  };

  // Inativar profissional (antigo excluir)
  const inativar = async (id: number) => {
    const resultado = await inativarProfissional(id);
    if (resultado.sucesso) {
      await carregar();
    }
    return resultado;
  };
  const reativar = async (id: number) => {
    const resultado = await reativarProfissional(id);
    if (resultado.sucesso) {
      await carregar();
    }
    return resultado;
  };

  // Resetar filtros
  const limparFiltros = () =>
    setFiltros({ nome: "", tipo: "", status: "", especialidade: "" });

  return {
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
    reativar,
  };
}
