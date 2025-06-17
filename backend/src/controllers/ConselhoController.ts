import { Request, Response } from "express";
import { ConselhoModel } from "../models/ConselhoModel";

export const listarConselhos = async (req: Request, res: Response) => {
  try {
    const conselhos = await ConselhoModel.listarTodos();
    return res.json(conselhos);
  } catch (error) {
    console.error("Erro ao listar conselhos:", error);
    return res.status(500).json({ message: "Erro ao listar conselhos" });
  }
};
