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
