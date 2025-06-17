import axios from "axios";
import { api } from "..";

export interface Pessoa {
  idPessoa: number; 
  nome: string;
  cpf: string;
  dataNascimento: string;
  sexo: string;
  conselhoProfissional?: string;
}

export async function buscarPessoaPorCPF(cpf: string): Promise<Pessoa | null> {
  try {
    const response = await axios.get<Pessoa>(`${api}/pessoas`, {
      params: { cpf },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pessoa:", error);
    return null;
  }
}
export { api };
