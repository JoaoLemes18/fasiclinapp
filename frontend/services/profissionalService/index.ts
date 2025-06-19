import axios from "axios";
import { api } from "..";

export interface ProfissionalCadastro {
  idPessoa: number;
  tipoProf: string;
  statusProf: string;
  codEspec: string;
  conselhoProf: string;
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
    await axios.post(`${api}/profissionais`, data);
    return true;
  } catch (error) {
    console.error("Erro ao cadastrar profissional:", error);
    return false;
  }
}
