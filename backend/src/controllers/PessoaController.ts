import { Request, Response } from "express";
import { PessoaModel } from "../models/PessoaModel";

export const buscarPorCPF = async (req: Request, res: Response) => {
  try {
    const { cpf } = req.query;

    if (!cpf) {
      return res.status(400).json({ message: "CPF é obrigatório" });
    }

    const pessoa = await PessoaModel.buscarPorCPF(cpf as string);

    if (!pessoa) {
      return res.status(404).json({ message: "Pessoa não encontrada" });
    }

    return res.json(pessoa);
  } catch (error) {
    console.error("Erro ao buscar pessoa:", error);
    return res.status(500).json({ message: "Erro ao buscar pessoa" });
  }
};

