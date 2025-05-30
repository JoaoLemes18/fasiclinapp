export interface ButtonProps {
    content: string;
    icon?: React.ReactNode;
    onPress?: () => void;
    [key: string]: any; // Para permitir que passe outras propriedades como style, etc.
  }
  