# 📋 Sistema de Cadastro de Profissionais

Este projeto é um sistema de cadastro de profissionais, permitindo gerenciar informações de pessoas físicas, especialidades e conselhos de forma prática e integrada.

## 🚀 Tecnologias utilizadas

- **Backend:** Node.js + Express + MySQL  
- **Frontend:** React Native + TypeScript + Expo  
- **Banco de Dados:** MySQL
- **Ambiente de Deploy:** Ubuntu Server com Systemd
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

---


## 🧱 Estrutura de Diretórios

```
fasiclinapp/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── app/
    ├── assets/
    ├── components/
    ├── constants/
    ├── context/
    ├── hooks/
    ├── interface/
    ├── lib/
    ├── node_modules/
    ├── scripts/
    ├── services/
    ├── styles/
    └── utils/

```

---

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

# Configure o IP da API no arquivo `src/services/index.ts`

```
---
## 📦 Geração de APK

Para gerar um APK de produção:

```bash
eas build --platform android
```

> ⚠️ Se estiver usando HTTP (sem HTTPS), adicione no `app.json`:

```json
"plugins": [
  [
    "expo-build-properties",
    {
      "android": {
        "usesCleartextTraffic": true
      }
    }
  ]
]
```
---

## 🧠 Considerações

- `runtimeVersion` deve ser uma string fixa, como `"1.1.1"`
- O backend deve escutar em `0.0.0.0` e estar acessível por IP fixo
- O serviço do backend pode ser persistido com `systemd` (ex: `backend_gabrielpereira.service`)



## 👤 Autor

- **João Guilherme Lemes**
- **RA:** 91660
- **LinkedIn:** (https://www.linkedin.com/in/joaolemes18/) 


## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.



## 📌 Rodapé

Projeto desenvolvido como parte dos estudos de Análise e Desenvolvimento de Sistemas – FASIPE.  
Todos os direitos reservados © 2025 – **João Lemes**.  
Para fins acadêmicos, de aprendizado e evolução profissional.

---
