import { Router } from "express";
import { buscarPorCPF } from "../controllers/PessoaController";
import { cadastrar } from "../controllers/ProfissionalController";
import { listarConselhos } from "../controllers/ConselhoController";
import { listarEspecialidades } from "../controllers/EspecialidadeController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

//url para dar get http://http://192.168.1.4:3000:3000/pessoas?cpf=...
router.get("/pessoas", asyncHandler(buscarPorCPF));

//url para dar post http://192.168.1.11:3000/profissionais
router.post("/profissionais", asyncHandler(cadastrar));

//url para dar get http://192.168.1.11:3000:3000/conselhos
router.get("/conselhos", asyncHandler(listarConselhos));

//url para dar get http://192.168.1.11:3000/especialidades?codespec=90
router.get("/especialidades", asyncHandler(listarEspecialidades));

export default router;
