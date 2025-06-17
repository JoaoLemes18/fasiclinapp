import axios from "axios";
import { api } from "..";

export interface Conselho {
  IDCONSEPROFI: number;
  DESCRICAO: string;
  ABREVCONS: string;
}

export async function buscarConselhos(): Promise<Conselho[]> {
  try {
    const response = await axios.get<Conselho[]>(`${api}/conselhos`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar conselhos:", error);
    return [];
  }
}
