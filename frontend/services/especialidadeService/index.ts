import axios from "axios";
import { api } from "..";

export interface Especialidade {
  IDESPEC: number;
  CODESPEC: string;
  DESCESPEC: string;
}

export async function buscarEspecialidades(): Promise<Especialidade[]> {
  try {
    const response = await axios.get<Especialidade[]>(`${api}/especialidades`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar especialidades:", error);
    return [];
  }
}
