import React, { createContext, useContext, useState } from "react";

interface Profissional {
  id_pessoa: number;
  tipo_prof: string;
  status_prof: string;
  cod_espec: string;
  conselho_prof: string;
  email_prof: string;
  senha_prof: string;
}

interface ProfissionalContextType {
  profissionais: Profissional[];
  adicionarProfissional: (profissional: Profissional) => void;
}

const ProfissionalContext = createContext<ProfissionalContextType | undefined>(
  undefined
);

export const ProfissionalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);

  const adicionarProfissional = (profissional: Profissional) => {
    setProfissionais((prev) => [...prev, profissional]);
  };

  return (
    <ProfissionalContext.Provider
      value={{ profissionais, adicionarProfissional }}
    >
      {children}
    </ProfissionalContext.Provider>
  );
};

export const useProfissional = () => {
  const context = useContext(ProfissionalContext);
  if (!context) {
    throw new Error(
      "useProfissional deve ser usado dentro de um ProfissionalProvider"
    );
  }
  return context;
};
