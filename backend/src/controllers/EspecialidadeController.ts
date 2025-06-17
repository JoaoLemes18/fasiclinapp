import { Request, Response } from "express";
import { EspecialidadeModel } from "../models/EspecialidadeModel";

export const listarEspecialidades = async (req: Request, res: Response) => {
  try {
    const especialidades = await EspecialidadeModel.listarTodos();
    return res.json(especialidades);
  } catch (error) {
    console.error("Erro ao listar especialidades:", error);
    return res.status(500).json({ message: "Erro ao listar especialidades" });
  }
};
