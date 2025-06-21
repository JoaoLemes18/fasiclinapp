import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { ProfissionalModel } from "../models/ProfissionalModel";
import { TipoProfissional, StatusProfissional } from "../utils/enums";

const ID_CONSELHO_DUMMY = 69;

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

    // Converte tipo/status para number antes de validar com enum
    const tipo = Number(tipoProf);
    const status = Number(statusProf);

    const isSemConselho =
      tipo === TipoProfissional.ADMINISTRATIVO ||
      tipo === TipoProfissional.MASTER;

    // Validação condicional
    if (
      !idPessoa ||
      tipo == null ||
      status == null ||
      !emailProf ||
      !senhaProf ||
      (!isSemConselho && (!conselhoProf || !codEspec))
    ) {
      return res
        .status(400)
        .json({ message: "Campos obrigatórios ausentes ou inválidos" });
    }

    if (!Object.values(TipoProfissional).includes(tipo)) {
      return res.status(400).json({ message: "Tipo profissional inválido" });
    }

    if (!Object.values(StatusProfissional).includes(status)) {
      return res.status(400).json({ message: "Status profissional inválido" });
    }

    let conselhoId: number;

    if (isSemConselho) {
      conselhoId = ID_CONSELHO_DUMMY;
    } else {
      const conselho = await ProfissionalModel.buscarConselho(
        Number(conselhoProf)
      );
      if (!conselho) {
        return res.status(400).json({ message: "Conselho não encontrado" });
      }
      conselhoId = conselho.IDCONSEPROFI;
    }

    const idProfissional = await ProfissionalModel.inserirProfissional({
      id_pessoafis: Number(idPessoa),
      tipo_profi: tipo.toString(),
      status_profi: status.toString(),
      id_conseprofi: conselhoId,
    });

    if (!isSemConselho && codEspec) {
      await ProfissionalModel.inserirProfiEspec({
        id_profissio: idProfissional,
        id_espec: Number(codEspec),
      });
    }

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

// ✅ listarProfissionais continua igual
export const listarProfissionais = async (req: Request, res: Response) => {
  try {
    const profissionais = await ProfissionalModel.buscarProfissionais();
    return res.status(200).json(profissionais);
  } catch (error) {
    console.error("Erro ao listar profissionais:", error);
    return res.status(500).json({ message: "Erro ao listar profissionais" });
  }
};
