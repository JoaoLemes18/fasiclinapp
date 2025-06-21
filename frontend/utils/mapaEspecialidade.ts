export const mapaEspecialidadeParaConselho: Record<number, number> = {
  1: 58, // Medicina → CRM
  2: 68, // NPJ → OAB
  3: 60, // Psicologia → CRP
  4: 61, // Odontologia → CFO
  5: 62, // Nutrição → CRN
  6: 1, // Fisioterapia → CREFITO
  7: 64, // Estética → ESTET
  8: 65, // Enfermagem → COREN
  9: 67, // Biomedicina → CRBM
};

/**
 * Dado o ID da especialidade, retorna o ID do conselho associado (ou null).
 */
export function obterIdConselhoPorEspecialidade(
  idEspec: number
): number | null {
  return mapaEspecialidadeParaConselho[idEspec] ?? null;
}
