
export function deveMostrarCamposEspeciais(tipoProf: number | null): boolean {
  if (tipoProf === null) return false;

  // tipos que NÃO exigem especialidade/conselho
  const tiposQueNaoMostram = [1, 4]; // Administrativo, Master

  return !tiposQueNaoMostram.includes(tipoProf);
}
