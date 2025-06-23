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

    const tipo = Number(tipoProf);
    const status = Number(statusProf);
    const isSemConselho =
      tipo === TipoProfissional.ADMINISTRATIVO ||
      tipo === TipoProfissional.MASTER;

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

export const atualizarProfissional = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const {
      tipoProf,
      statusProf,
      conselhoProf,
      codEspec,
      emailProf,
      senhaProf,
    } = req.body;

    if (!id || !tipoProf || !statusProf || !emailProf) {
      return res.status(400).json({ message: "Campos obrigatórios ausentes" });
    }

    const tipo = Number(tipoProf);
    const status = Number(statusProf);

    if (!Object.values(TipoProfissional).includes(tipo)) {
      return res.status(400).json({ message: "Tipo profissional inválido" });
    }

    if (!Object.values(StatusProfissional).includes(status)) {
      return res.status(400).json({ message: "Status profissional inválido" });
    }

    const isSemConselho =
      tipo === TipoProfissional.ADMINISTRATIVO ||
      tipo === TipoProfissional.MASTER;

    const conselhoId = isSemConselho ? ID_CONSELHO_DUMMY : Number(conselhoProf);
    const especId = isSemConselho ? null : Number(codEspec);

    await ProfissionalModel.atualizarProfissional(id, {
      tipo_profi: tipo.toString(),
      status_profi: status.toString(),
      id_conseprofi: conselhoId,
    });

    if (especId) {
      await ProfissionalModel.atualizarProfiEspec(id, especId);
    }

    await ProfissionalModel.atualizarUsuario(id, {
      email: emailProf,
      senha: senhaProf ? await bcrypt.hash(senhaProf, 10) : undefined,
    });

    return res.json({ message: "Profissional atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar profissional:", error);
    return res.status(500).json({ message: "Erro ao atualizar profissional" });
  }
};

export const inativarProfissional = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: "ID inválido" });

    await ProfissionalModel.inativarProfissional(id);
    return res.json({ message: "Profissional inativado com sucesso" });
  } catch (error) {
    console.error("Erro ao inativar profissional:", error);
    return res.status(500).json({ message: "Erro ao inativar profissional" });
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
