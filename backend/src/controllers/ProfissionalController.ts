import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { ProfissionalModel } from "../models/ProfissionalModel";
import { TipoProfissional, StatusProfissional } from "../utils/enums"; // ajuste o caminho conforme seu projeto

export const cadastrar = async (req: Request, res: Response) => {
  try {
    const {
      idPessoa,
      tipoProf,
      statusProf,
      conselhoProf,
      emailProf,
      senhaProf,
      codEspec,
    } = req.body;

    // Validação de campos obrigatórios
    if (
      !idPessoa ||
      tipoProf == null ||
      statusProf == null ||
      !conselhoProf ||
      !emailProf ||
      !senhaProf ||
      !codEspec
    ) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    // Converte tipo/status para number antes de validar com enum
    const tipo = Number(tipoProf);
    const status = Number(statusProf);

    if (!Object.values(TipoProfissional).includes(tipo)) {
      return res.status(400).json({ message: "Tipo profissional inválido" });
    }

    if (!Object.values(StatusProfissional).includes(status)) {
      return res.status(400).json({ message: "Status profissional inválido" });
    }

    const conselho = await ProfissionalModel.buscarConselho(
      Number(conselhoProf)
    );
    if (!conselho) {
      return res.status(400).json({ message: "Conselho não encontrado" });
    }

    const idProfissional = await ProfissionalModel.inserirProfissional({
      id_pessoafis: Number(idPessoa),
      tipo_profi: tipo.toString(), // grava como string no banco
      status_profi: status.toString(),
      id_conseprofi: conselho.IDCONSEPROFI,
    });

    await ProfissionalModel.inserirProfiEspec({
      id_profissio: idProfissional,
      id_espec: Number(codEspec),
    });

    const senhaCriptografada = await bcrypt.hash(senhaProf, 10);

    await ProfissionalModel.inserirUsuario({
      id_profissio: idProfissional,
      email: emailProf,
      senha: senhaCriptografada,
    });

    return res
      .status(201)
      .json({ message: "Profissional cadastrado com sucesso" });
  } catch (error: any) {
    console.error("Erro ao cadastrar profissional:", error.message || error);
    return res.status(500).json({ message: "Erro ao cadastrar profissional" });
  }
};

export const listarProfissionais = async (req: Request, res: Response) => {
  try {
    const profissionais = await ProfissionalModel.buscarProfissionais();
    return res.status(200).json(profissionais);
  } catch (error) {
    console.error("Erro ao listar profissionais:", error);
    return res.status(500).json({ message: "Erro ao listar profissionais" });
  }
};
