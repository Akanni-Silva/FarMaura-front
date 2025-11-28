# FarMaura - Frontend

Um aplicativo web moderno para gerenciamento de medicamentos e horários de doses. Permite aos usuários cadastrar remédios, definir períodos de administração e receber destaque do medicamento com a próxima dose mais próxima do horário atual.

**Autor:** [Akanni Silva](https://github.com/Akanni-Silva)

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Modelos de Dados (Entidades)](#modelos-de-dados-entidades)
- [Inicialização](#inicialização)
- [Rotas da Aplicação](#rotas-da-aplicação)
- [Arquitetura de Componentes](#arquitetura-de-componentes)
- [Contribuição](#contribuição)

---

## 🎯 Visão Geral

**FarMaura** é uma plataforma de gerenciamento de medicamentos que ajuda usuários a:

- ✅ Registrar e organizar medicamentos pessoais
- ✅ Definir períodos (horários) de administração
- ✅ Visualizar o medicamento com dose mais próxima do horário atual em destaque
- ✅ Gerenciar cronograma de medicamentos de forma intuitiva


---

## 🛠 Tecnologias

### Frontend

- **React 19.1.1** - Biblioteca UI com componentes
- **TypeScript 5.9.3** - Desenvolvimento type-safe
- **Vite 7.1.7** - Ferramenta de build e dev server ultrarrápido
- **React Router DOM 7.9.5** - Roteamento e navegação
- **Tailwind CSS 4.1.16** - Estilização utilitária
- **Axios 1.13.1** - Cliente HTTP para chamadas à API
- **Phosphor Icons 2.1.10** - Biblioteca de ícones vetoriais
- **React Spinners 0.17.0** - Componentes de carregamento (spinners)
- **React Toastify 11.0.5** - Notificações toast

### Ferramentas de Desenvolvimento

- **ESLint 9.36.0** - Ferramenta de análise de código
- **SWC** - Compilador ultrarrápido para React

---

## 📁 Estrutura do Projeto

```
FarMaura-front/
├── src/
│   ├── App.tsx                          # Componente raiz com rotas
│   ├── main.tsx                         # Entrada da aplicação
│   ├── index.css                        # Estilos globais
│   │
│   ├── assets/                          # Recursos estáticos (imagens, fontes)
│   │
│   ├── components/                      # Componentes reutilizáveis
│   │   ├── footer/
│   │   │   └── Footer.tsx               # Rodapé da aplicação
│   │   ├── navbar/
│   │   │   └── Navbar.tsx               # Barra de navegação
│   │   ├── periodos/                    # Componentes de períodos (horários)
│   │   │   ├── cardPeriodo/
│   │   │   │   └── CardPeriodo.tsx      # Card exibindo um período
│   │   │   ├── deletarPeriodo/
│   │   │   │   └── DeletarPeriodo.tsx   # Componente deletar período
│   │   │   ├── formPeriodo/
│   │   │   │   └── FormPeriodo.tsx      # Formulário criar/editar período
│   │   │   └── listarPeriodos/
│   │   │       └── ListarPeriodos.tsx   # Listagem de períodos
│   │   └── remedio/                     # Componentes de medicamentos
│   │       ├── cardDestaque/
│   │       │   └── CardDestaque.tsx     # Card do remédio em destaque (próxima dose)
│   │       ├── cardRemdio/
│   │       │   └── CardRemedio.tsx      # Card de um remédio individual
│   │       ├── deletarRemedio/
│   │       │   └── DeletarRemedio.tsx   # Componente deletar medicamento
│   │       ├── formRemedio/
│   │       │   └── FormRemedio.tsx      # Formulário criar/editar medicamento
│   │       └── listarRemedios/
│   │           └── ListarRemedios.tsx   # Listagem de medicamentos
│   │
│   ├── contexts/                        # Contextos React (gerenciamento de estado)
│   │   └── AuthContext.tsx              # Contexto de autenticação (login/logout)
│   │
│   ├── models/                          # Interfaces TypeScript (entidades)
│   │   ├── Periodo.ts                   # Interface de Período (horário)
│   │   ├── Remedio.ts                   # Interface de Medicamento
│   │   ├── Usuario.ts                   # Interface de Usuário
│   │   └── UsuarioLogin.ts              # Interface de Login
│   │
│   ├── pages/                           # Páginas (rotas)
│   │   ├── cadastro/
│   │   │   └── Cadastro.tsx             # Página de registro de novo usuário
│   │   ├── home/
│   │   │   └── Home.tsx                 # Página principal (dashboard)
│   │   └── login/
│   │       └── Login.tsx                # Página de autenticação
│   │
│   └── services/                        # Serviços de API
│       └── Service.ts                   # Funções de requisições HTTP
│
├── public/                              # Arquivos públicos (favicons, etc.)
├── eslint.config.js                     # Configuração ESLint
├── index.html                           # HTML raiz
├── package.json                         # Dependências e scripts
├── tsconfig.json                        # Configuração TypeScript
├── tsconfig.app.json                    # TypeScript específico da app
├── tsconfig.node.json                   # TypeScript para ferramentas (Vite, etc.)
├── vite.config.ts                       # Configuração Vite
└── README.md                            # Este arquivo
```

---

## 🏗 Modelos de Dados (Entidades)

### Usuario

Representa um usuário do sistema.

```typescript
interface Usuario {
  id: number; // ID único do usuário
  nome: string; // Nome completo
  usuario: string; // Username/login
  foto: string; // URL da foto de perfil
  senha: string; // Senha (armazenada no backend)
  remedios?: Remedio[] | null; // Lista de medicamentos do usuário
}
```

### UsuarioLogin

Representa os dados de um usuário autenticado, incluindo token de sessão.

```typescript
interface UsuarioLogin {
  id: number; // ID único do usuário
  nome: string; // Nome completo
  usuario: string; // Username/login
  senha: string; // Senha
  foto: string; // URL da foto de perfil
  token: string; // Token JWT para autenticação em requisições
}
```

### Remedio

Representa um medicamento cadastrado por um usuário.

```typescript
interface Remedio {
  id: number; // ID único do medicamento
  nome: string; // Nome do medicamento
  doseMg?: number; // Dosagem em miligramas (opcional)
  periodo?: Periodo | null; // Período de administração associado
  usuario?: Usuario | null; // Usuário proprietário do medicamento
}
```

### Periodo

Representa um período/horário de administração de um medicamento.

```typescript
interface Periodo {
  id: number; // ID único do período
  nome: string; // Nome/descrição do período (ex: "Manhã", "Noite")
  horario: string; // Horário em formato HH:mm ou HH:mm:ss
  remedio: Remedio[] | null; // Medicamentos associados a este período
}
```

---

## 🚀 Inicialização

### Pré-requisitos

- **Node.js** (v18 ou superior)
- **npm** ou **yarn**
- Conexão com a internet (para conectar à API backend)

### Passos para Inicializar

#### 1. Clonar o repositório

```bash
git clone https://github.com/Akanni-Silva/FarMaura-front.git
cd FarMaura-front
```

#### 2. Instalar dependências

```bash
npm install
```

#### 3. Rodar servidor de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada no terminal).

#### 4. Compilar para produção

```bash
npm run build
```

Gera os arquivos otimizados na pasta `dist/`.

#### 5. Verificar qualidade do código

```bash
npm run lint
```

Executa ESLint para identificar problemas de código.

#### 6. Visualizar build de produção localmente

```bash
npm run preview
```

Serve os arquivos compilados em `dist/` para teste local.

---

## 🛣 Rotas da Aplicação

| Rota                  | Componente     | Descrição                                     |
| --------------------- | -------------- | --------------------------------------------- |
| `/`                   | Login          | Página de autenticação                        |
| `/home`               | Home           | Página principal com medicamentos em destaque |
| `/remedios`           | ListarRemedios | Listagem completa de medicamentos             |
| `/cadastro`           | Cadastro       | Página de registro de novo usuário            |
| `/periodos`           | ListarPeriodos | Listagem de períodos (horários)               |
| `/cadastrarperiodo`   | FormPeriodo    | Criar novo período                            |
| `/editarperiodo/:id`  | FormPeriodo    | Editar período existente                      |
| `/deletarperiodo/:id` | DeletarPeriodo | Deletar período                               |
| `/cadastrarremedio`   | FormRemedio    | Criar novo medicamento                        |
| `/editarremedio/:id`  | FormRemedio    | Editar medicamento existente                  |
| `/deletarremedio/:id` | DeletarRemedio | Deletar medicamento                           |

---

## 🏛 Arquitetura de Componentes

### Estrutura em Camadas

```
┌─────────────────────────────────────┐
│         Pages (Rotas)               │
│  (Home, Login, Cadastro)            │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│    Components (Componentes UI)       │
│ (Cards, Forms, Lists, Actions)      │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  Services (Chamadas API/HTTP)       │
│      (axios, Auth, CRUD)            │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Backend API (Render)              │
│ https://farmaura.onrender.com       │
└─────────────────────────────────────┘
```

### Context (Autenticação)

O `AuthContext` gerencia globalmente:

- Dados do usuário autenticado
- Token de sessão (JWT)
- Funções `handleLogin()` e `handleLogout()`
- Estado de carregamento durante login

Qualquer componente pode acessar o contexto via hook:

```typescript
const { usuario, handleLogin, handleLogout, isLoading } =
  useContext(AuthContex);
```

### Serviços (Service.ts)

Centraliza todas as requisições HTTP:

- `cadastrarUsuario()` - POST criar usuário
- `login()` - POST autenticar
- `buscar()` - GET obter dados
- `cadastrar()` - POST criar recurso
- `atualizar()` - PUT editar recurso
- `deletar()` - DELETE remover recurso

---

## 💡 Funcionalidades Principais

### 🎯 Destaque do Próximo Remédio

Na página `/home`, o componente `Home.tsx` calcula e exibe em destaque o medicamento cuja próxima dose é a **mais próxima do horário atual**. A lógica:

1. Coleta todos os medicamentos do usuário
2. Extrai o horário de cada um (`periodo.horario`)
3. Calcula a próxima ocorrência (hoje se ainda não passou, amanhã caso contrário)
4. Seleciona o medicamento com menor diferença de tempo
5. Renderiza apenas esse medicamento no `CardDestaque`

### 🔐 Autenticação

- Login com usuário e senha
- Token JWT armazenado em estado global
- Logout e limpeza de sessão
- Proteção de rotas (redirecionamento se não autenticado)

### 📱 Responsividade

- Design mobile-first com Tailwind CSS
- Componentes adaptáveis a diferentes tamanhos de tela
- Grid layout responsivo (1 coluna mobile, 3 colunas desktop)

---

## 📦 Dependências Principais

| Pacote                | Versão  | Uso                  |
| --------------------- | ------- | -------------------- |
| react                 | ^19.1.1 | Framework UI         |
| react-dom             | ^19.1.1 | Renderização DOM     |
| react-router-dom      | ^7.9.5  | Roteamento           |
| typescript            | ~5.9.3  | Segurança de tipos   |
| vite                  | ^7.1.7  | Ferramenta de build  |
| tailwindcss           | ^4.1.16 | CSS utilitário       |
| axios                 | ^1.13.1 | Cliente HTTP         |
| @phosphor-icons/react | ^2.1.10 | Biblioteca de ícones |

---

## 🔧 Variáveis de Ambiente


Para usar variáveis de ambiente personalizadas, crie arquivos `.env` e `.env.local`:

```env
VITE_API_BASE_URL=https://SuaAPI.com
```

---

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 👤 Autor

**Akanni Silva**

- GitHub: [@Akanni-Silva](https://github.com/Akanni-Silva)
- Projeto: [FarMaura](https://github.com/Akanni-Silva/FarMaura-front)

---

## 📝 Licença

Este projeto está sob licença [MIT](LICENSE) - veja o arquivo LICENSE para detalhes.

---

## 📞 Suporte

Para dúvidas, issues ou sugestões, abra uma [issue no GitHub](https://github.com/Akanni-Silva/FarMaura-front/issues).

---

**Última atualização:** Novembro de 2025

## Compilador React

O Compilador React atualmente não é compatível com SWC. Consulte [esta issue](https://github.com/vitejs/vite-plugin-react/issues/428) para acompanhar o progresso.

## Expandindo a configuração de ESLint

Se você está desenvolvendo uma aplicação para produção, recomendamos atualizar a configuração para ativar regras de lint com consciência de tipos:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Outras configurações...

      // Remova tseslint.configs.recommended e substitua por isto
      tseslint.configs.recommendedTypeChecked,
      // Alternativamente, use isto para regras mais rigorosas
      tseslint.configs.strictTypeChecked,
      // Opcionalmente, adicione isto para regras estilísticas
      tseslint.configs.stylisticTypeChecked,

      // Outras configurações...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // outras opções...
    },
  },
]);
```

Você também pode instalar [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) e [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) para regras de lint específicas do React:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Outras configurações...
      // Ative regras de lint para React
      reactX.configs["recommended-typescript"],
      // Ative regras de lint para React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // outras opções...
    },
  },
]);
```
