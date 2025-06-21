import axios from "axios";
import { api } from "..";

export interface ProfissionalCadastro {
  idPessoa: number;
  tipoProf: string; // ex: "1"
  statusProf: string;
  codEspec?: string; // agora opcionais
  conselhoProf?: string; // idem
  emailProf: string;
  senhaProf: string;
}

export interface Profissional {
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

    // Somente adiciona se tipo exigir
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
