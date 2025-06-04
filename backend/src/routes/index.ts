import { Router } from "express";
import { buscarPorCPF } from "../controllers/PessoaController";
import { cadastrar } from "../controllers/ProfissionalController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

//url para dar get http://localhost:3000/pessoas?cpf=...
router.get("/pessoas", asyncHandler(buscarPorCPF));

//url para dar post http://localhost:3000/profissionais
router.post("/profissionais", asyncHandler(cadastrar));

export default router;
