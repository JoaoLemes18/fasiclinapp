v# 📋 Sistema de Cadastro de Profissionais

Este projeto é um sistema de cadastro de profissionais, permitindo gerenciar informações de pessoas físicas, especialidades e conselhos de forma prática e integrada.

## 🚀 Tecnologias utilizadas

- **Backend:** Node.js + Express + MySQL  
- **Frontend:** React Native + TypeScript + Expo  
- **Banco de Dados:** MySQL  
- **Outras libs:** bcrypt, axios, expo-router, react-hooks, entre outras

## ⚙️ Funcionalidades

- Cadastro de profissionais com:
  - Nome, CPF, data de nascimento e sexo
  - Tipo de profissional (ex: médico, odontólogo, administrativo)
  - Conselho profissional (CRM, CRO, etc.)
  - Especialidade
- Listagem completa de profissionais
- Edição e exclusão (inativação) de profissionais
- Reativação de profissionais inativados
- Filtro de profissionais por especialidade
- Busca de pessoas físicas por CPF
- Autenticação de usuário via CPF e senha 
- Associação dinâmica de especialidade e conselho conforme o tipo de profissional
- Validação de dados e tratamento de erros no backend

## 💻 Como rodar o projeto

### Pré-requisitos

- Node.js instalado
- MySQL configurado e rodando localmente
- npm ou yarn instalados

### Backend

```bash
# Clone o repositório
git clone https://github.com/JoaoLemes18/fasiclinapp.git

# Navegue até o backend
cd backend

# Instale as dependências
npm install

# Configure o .env com as variáveis de conexão ao banco de dados

# Rode as migrations se aplicável

# Inicie o servidor
npm run dev

```
### Frontend

```bash

# Navegue até o frontend
cd frontend

# Instale as dependências
npm install

# Inicie o app
npx expo start

```

## 👤 Autor

- **João Guilherme Lemes**
- **RA:** 91660
- **LinkedIn:** (https://www.linkedin.com/in/joaolemes18/) 
---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📌 Rodapé

Projeto desenvolvido como parte dos estudos de Análise e Desenvolvimento de Sistemas – FASIPE.  
Todos os direitos reservados © 2025 – **João Lemes**.  
Para fins acadêmicos, de aprendizado e evolução profissional.

---
