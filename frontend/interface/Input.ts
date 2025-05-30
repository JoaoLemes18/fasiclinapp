export interface InputProps {
    type?: string;
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    [key: string]: any; // Para permitir que passe outras propriedades como style, etc.
  }
  