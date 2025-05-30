import { PessoaModel } from "../models/PessoaModel";

export class PessoaService {
  static async buscarPorCPF(cpf: string) {
    return await PessoaModel.buscarPorCPF(cpf);
  }
}
