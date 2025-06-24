import { Router } from "express";
import { buscarPorCPF } from "../controllers/PessoaController";
import {
  cadastrar,
  listarProfissionais,
  atualizarProfissional,
  inativarProfissional,
} from "../controllers/ProfissionalController";
import { listarConselhos } from "../controllers/ConselhoController";
import { listarEspecialidades } from "../controllers/EspecialidadeController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

//url para dar get http://160.20.22.99:5140//pessoas?cpf=...
router.get("/pessoas", asyncHandler(buscarPorCPF));

//url para dar post //http://160.20.22.99:5140//profissionais
router.post("/profissionais", asyncHandler(cadastrar));
router.get("/profissionais", asyncHandler(listarProfissionais));

//url para dar get //http://160.20.22.99:5140/:3000/conselhos
router.get("/conselhos", asyncHandler(listarConselhos));

//url para dar get //http://160.20.22.99:5140/especialidades?codespec=90
router.get("/especialidades", asyncHandler(listarEspecialidades));

router.put("/profissionais/:id", asyncHandler(atualizarProfissional));
router.delete("/profissionais/:id", asyncHandler(inativarProfissional));

export default router;
