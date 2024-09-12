# Task Manager - Gerenciamento de Tarefas

## Descrição

O **Task Manager** é uma aplicação web de gerenciamento de tarefas que permite a criação, edição e atribuição de tarefas a membros de uma equipe. O projeto utiliza o Firebase como back-end para autenticação, armazenamento de dados (Firestore) e notificações via Firebase Functions. A interface é construída com React, proporcionando uma experiência reativa e moderna para o usuário.

## Funcionalidades

- **Autenticação de Usuários**: Autenticação via Firebase Authentication com suporte para login e registro.
- **Gerenciamento de Membros**: Criação, edição e exclusão de membros da equipe.
- **Gestão de Tarefas**: Criação, edição e atribuição de tarefas aos membros da equipe, com cálculo automático das horas alocadas para cada membro.
- **Notificações**: Envio de notificações automáticas via Firebase Functions para tarefas que estão próximas do prazo.
- **Proteção de Rotas**: Acesso restrito a certas rotas apenas para usuários autenticados.

## Tecnologias Utilizadas

- **Front-End**:
  - React
  - React Router (para navegação e proteção de rotas)
  - Bootstrap (para o design da interface)
- **Back-End**:
  - Firebase Firestore (banco de dados)
  - Firebase Authentication (autenticação de usuários)
  - Firebase Functions (para notificações automáticas)

## Pré-requisitos

- **Node.js** (v14 ou superior)
- **Firebase CLI** (para deploy e gerenciamento de Firebase Functions)
- Conta no **Firebase** com um projeto criado

## Instalação e Configuração

### 1. Clone o Repositório
git clone https://github.com/seu-usuario/task-manager.git
cd task-manager

### 2. Instale as Dependências
Front-End:
bash
cd frontend
npm install
Back-End (Firebase Functions):
bash
cd functions
npm install

### 3. Configuração do Firebase
a. Firebase Authentication
No Firebase Console, vá para a aba Authentication e habilite o método de Email/Senha.
b. Firebase Firestore
No Firebase Console, configure o Firestore e crie as coleções necessárias:
teamMembers: Para armazenar os membros da equipe.
tasks: Para armazenar as tarefas.
c. Configuração do Firebase no Projeto
No diretório frontend, crie um arquivo chamado firebaseConfig.js em src/ e adicione as credenciais do Firebase:
javascript

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

### 4. Deploy do Firebase Functions
Dentro do diretório functions, configure as notificações de tarefas próximas ao prazo.

Use o Firebase CLI para fazer o deploy das funções:

bash
firebase deploy --only functions

### 5. Inicializar o Projeto Localmente
a. Iniciar o Front-End:
No diretório frontend:

bash
npm start
A aplicação será aberta em http://localhost:3000.

Uso
Autenticação
Registro: Acesse a página de registro via o botão "Registrar" na Home. Após o registro bem-sucedido, você será redirecionado para a página de login.
Login: Após o login, você será redirecionado para a lista de tarefas.
Gerenciamento de Tarefas
Criação de Tarefas: Navegue até a página "Cadastro de Tarefas" e preencha os detalhes da tarefa. Você pode atribuir um membro da equipe à tarefa e definir o prazo.
Atribuição de Membros: Na lista de tarefas, você pode editar ou atribuir membros às tarefas.
Notificações: Membros serão notificados automaticamente via e-mail se uma tarefa estiver próxima do prazo.
Firebase Functions - Notificações
As notificações automáticas de tarefas próximas do prazo são gerenciadas pelas Firebase Functions, que são agendadas para rodar a cada 24 horas e enviar e-mails para os membros responsáveis pelas tarefas.

Estrutura do Projeto
bash
Copiar código
task-manager/
├── frontend/                  # Código do Front-End (React)
│   ├── public/
│   └── src/
│       ├── components/        # Componentes React (Login, Registro, Tarefas, Membros)
│       ├── services/          # API e autenticação
│       └── firebaseConfig.js  # Configuração do Firebase
├── functions/                 # Código das Firebase Functions
│   ├── index.js               # Funções do Firebase para notificações
│   └── package.json
└── README.md                  # Instruções do projeto
Considerações Finais
Este projeto serve como um exemplo de integração do React com o Firebase para autenticação, gerenciamento de banco de dados em tempo real (Firestore) e execução de notificações automáticas via Firebase Functions. Ele pode ser expandido com mais funcionalidades, como notificações push usando Firebase Cloud Messaging (FCM).

Se você tiver dúvidas ou precisar de mais informações, sinta-se à vontade para abrir uma issue no repositório ou contribuir com melhorias! 😊

### Explicação do Conteúdo:

- **Descrição**: Uma breve descrição do projeto de gerenciamento de tarefas.
- **Funcionalidades**: Explicação das principais funcionalidades do sistema, como autenticação, gerenciamento de membros e tarefas, notificações automáticas.
- **Tecnologias Utilizadas**: Lista de tecnologias de front-end e back-end.
- **Instalação e Configuração**: Passo a passo para configurar o Firebase, instalar dependências e rodar o projeto localmente.
- **Uso**: Instruções sobre como utilizar as principais funcionalidades do projeto.
- **Firebase Functions**: Explicação sobre as notificações automáticas de tarefas próximas do prazo usando Firebase Functions.
- **Estrutura do Projeto**: Estrutura básica do projeto.
- **Considerações Finais**: Explicação sobre o propósito do projeto e possíveis futuras melhorias.

Você pode adicionar mais detalhes ou ajustar conforme necessário para o seu projeto.

