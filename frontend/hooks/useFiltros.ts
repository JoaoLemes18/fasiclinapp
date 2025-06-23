import { useEffect, useState } from "react";
import {
  buscarEspecialidades,
  Especialidade,
} from "@/services/especialidadeService";

export function useFiltros() {
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);

  useEffect(() => {
    const carregar = async () => {
      const data = await buscarEspecialidades();
      setEspecialidades(data);
    };
    carregar();
  }, []);

  return { especialidades };
}
