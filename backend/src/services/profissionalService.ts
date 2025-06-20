import { ProfissionalModel } from "../models/ProfissionalModel";
import bcrypt from "bcrypt";

export class ProfissionalService {
  static async cadastrarProfissional(data: any) {
    const conselho = await ProfissionalModel.buscarConselho(data.conselho_prof);
    if (!conselho) throw new Error("Conselho não encontrado");

    const profissional = await ProfissionalModel.inserirProfissional({
      id_pessoafis: data.id_pessoafis,
      tipo_profi: data.tipo_profi,
      status_profi: data.status_profi,
      id_conseprofi: conselho.IDCONSEPROFI,
    });

    const senhaHash = await bcrypt.hash(data.senha_prof, 10);

    await ProfissionalModel.inserirUsuario({
  id_profissio: profissional, // aqui usamos direto o ID
      email: data.email_prof,
      senha: senhaHash,
    });

    return profissional;
  }
}
