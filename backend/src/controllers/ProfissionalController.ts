import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { ProfissionalModel } from "../models/ProfissionalModel";
import {
  Especialidade,
  TipoProfissional,
  StatusProfissional,
} from "../utils/enums"; // ajuste o caminho conforme seu projeto

export const cadastrar = async (req: Request, res: Response) => {
  try {
    const {
      id_pessoafis,
      tipo_profi,
      status_profi,
      conselho_prof,
      email_prof,
      senha_prof,
    } = req.body;

    // Verificação campos obrigatórios
    if (
      !id_pessoafis ||
      !tipo_profi ||
      !status_profi ||
      !conselho_prof ||
      !email_prof ||
      !senha_prof
    ) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    // Valida se tipo_profi está entre os valores válidos do enum TipoProfissional
    if (!Object.values(TipoProfissional).includes(tipo_profi)) {
      return res.status(400).json({ message: "Tipo profissional inválido" });
    }

    // Valida se status_profi está entre os valores válidos do enum StatusProfissional
    if (!Object.values(StatusProfissional).includes(status_profi)) {
      return res.status(400).json({ message: "Status profissional inválido" });
    }

    // Valida se conselho_prof está entre os valores válidos do enum Especialidade
    if (typeof conselho_prof !== "number" || conselho_prof <= 0) {
      return res
        .status(400)
        .json({ message: "Conselho profissional inválido" });
    }

    // Busca o conselho no banco
    const conselho = await ProfissionalModel.buscarConselho(conselho_prof);

    if (!conselho) {
      return res.status(400).json({ message: "Conselho não encontrado" });
    }

    // Insere o profissional e obtém o ID gerado
    const idProfissional = await ProfissionalModel.inserirProfissional({
      id_pessoafis,
      tipo_profi,
      status_profi,
      id_conseprofi: conselho.IDCONSEPROFI,
    });

    // Criptografa a senha
    const senhaCriptografada = await bcrypt.hash(senha_prof, 10);

    // Insere o usuário com o id do profissional
    await ProfissionalModel.inserirUsuario({
      id_profissio: idProfissional,
      email: email_prof,
      senha: senhaCriptografada,
    });

    return res
      .status(201)
      .json({ message: "Profissional cadastrado com sucesso" });
  } catch (error) {
    console.error("Erro ao cadastrar profissional:", error);
    return res.status(500).json({ message: "Erro ao cadastrar profissional" });
  }
};
