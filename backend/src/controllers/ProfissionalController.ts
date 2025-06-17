import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { ProfissionalModel } from "../models/ProfissionalModel";
import {
  Especialidade,
  TipoProfissional,
  StatusProfissional,
} from "../utils/enums";

export const cadastrar = async (req: Request, res: Response) => {
  try {
    const {
      id_pessoafis,
      tipo_profi,
      status_profi,
      conselho_prof,
      email_prof,
      senha_prof,
      id_espec, // novo campo
    } = req.body;
    const tipo = Number(tipo_profi);
    const status = Number(status_profi);
    if (
      !id_pessoafis ||
      !tipo_profi ||
      !status_profi ||
      !conselho_prof ||
      !email_prof ||
      !senha_prof ||
      !id_espec
    ) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    if (!Object.values(TipoProfissional).includes(tipo_profi)) {
      return res.status(400).json({ message: "Tipo profissional inválido" });
    }

    if (!Object.values(StatusProfissional).includes(status_profi)) {
      return res.status(400).json({ message: "Status profissional inválido" });
    }

    if (typeof conselho_prof !== "number" || conselho_prof <= 0) {
      return res
        .status(400)
        .json({ message: "Conselho profissional inválido" });
    }

    const conselho = await ProfissionalModel.buscarConselho(conselho_prof);
    if (!conselho) {
      return res.status(400).json({ message: "Conselho não encontrado" });
    }

    const idProfissional = await ProfissionalModel.inserirProfissional({
      id_pessoafis,
      tipo_profi,
      status_profi,
      id_conseprofi: conselho.IDCONSEPROFI,
    });

    const senhaCriptografada = await bcrypt.hash(senha_prof, 10);

    await ProfissionalModel.inserirUsuario({
      id_profissio: idProfissional,
      email: email_prof,
      senha: senhaCriptografada,
    });

    await ProfissionalModel.inserirEspecialidade({
      id_profissio: idProfissional,
      id_espec,
    });

    return res
      .status(201)
      .json({ message: "Profissional cadastrado com sucesso" });
  } catch (error) {
    console.error("Erro ao cadastrar profissional:", error);
    return res.status(500).json({ message: "Erro ao cadastrar profissional" });
  }
};
