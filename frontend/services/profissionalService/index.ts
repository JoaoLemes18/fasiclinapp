import axios from "axios";
import { api } from "..";

export interface ProfissionalCadastro {
  idPessoa: number;
  tipoProf: string;
  statusProf: string;
  codEspec?: string;
  conselhoProf?: string;
  emailProf: string;
  senhaProf: string;
}

export interface Profissional {
  ID_PESSOAFIS: number;
  LOGUSUARIO: string;
  DESCRICAO: string;
  ABREVCONS: string;
  IDPROFISSIO: number;
  NOMEPESSOA: string;
  TIPOPROFI: string;
  STATUSPROFI: string;
  IDESPEC: number;
  CODESPEC: string;
  DESCESPEC: string;
  IDCONSEPROFI: number;
  NOMECONSE: string;
}

export async function listarProfissionais(): Promise<Profissional[]> {
  try {
    const response = await axios.get(`${api}/profissionais`);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar profissionais:", error);
    return [];
  }
}
export async function reativarProfissional(
  id: number
): Promise<{ sucesso: boolean; mensagem?: string }> {
  try {
    await axios.patch(`${api}/profissionais/${id}/reativar`);
    return { sucesso: true };
  } catch (error: any) {
    console.error("Erro ao reativar profissional:", error);
    return {
      sucesso: false,
      mensagem: "Erro ao reativar profissional",
    };
  }
}

export async function atualizarProfissional(
  id: number,
  data: ProfissionalCadastro
): Promise<{ sucesso: boolean; mensagem?: string }> {
  try {
    const tipo = Number(data.tipoProf);
    const status = Number(data.statusProf);

    if (!data.emailProf || !tipo || !status || !data.idPessoa) {
      return { sucesso: false, mensagem: "Campos obrigatórios ausentes." };
    }

    const isSemConselho = tipo === 1 || tipo === 4;

    const payload: any = {
      idPessoa: data.idPessoa,
      tipoProf: tipo.toString(),
      statusProf: status.toString(),
      emailProf: data.emailProf,
      senhaProf: data.senhaProf,
    };

    if (!isSemConselho) {
      if (!data.conselhoProf || !data.codEspec) {
        return {
          sucesso: false,
          mensagem:
            "Especialidade e conselho são obrigatórios para esse tipo de profissional.",
        };
      }

      Object.assign(payload, {
        conselhoProf: data.conselhoProf,
        codEspec: data.codEspec,
      });
    }

    await axios.put(`${api}/profissionais/${id}`, payload);
    return { sucesso: true };
  } catch (error: any) {
    console.error("Erro ao atualizar profissional:", error);
    return {
      sucesso: false,
      mensagem: "Erro ao atualizar profissional",
    };
  }
}

export async function inativarProfissional(
  id: number
): Promise<{ sucesso: boolean; mensagem?: string }> {
  try {
    await axios.delete(`${api}/profissionais/${id}`);
    return { sucesso: true };
  } catch (error: any) {
    console.error("Erro ao inativar profissional:", error);
    return {
      sucesso: false,
      mensagem: "Erro ao inativar profissional",
    };
  }
}

export async function cadastrarProfissional(
  data: ProfissionalCadastro
): Promise<boolean> {
  try {
    const tipo = Number(data.tipoProf);

    const payload = {
      idPessoa: data.idPessoa,
      tipoProf: data.tipoProf,
      statusProf: data.statusProf,
      emailProf: data.emailProf,
      senhaProf: data.senhaProf,
    };

    if (tipo !== 1 && tipo !== 4) {
      Object.assign(payload, {
        conselhoProf: data.conselhoProf,
        codEspec: data.codEspec,
      });
    }

    await axios.post(`${api}/profissionais`, payload);
    return true;
  } catch (error) {
    console.error("Erro ao cadastrar profissional:", error);
    return false;
  }
}
