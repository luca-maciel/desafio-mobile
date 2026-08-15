# 📱 Desafio Técnico — Authentication Mobile

Aplicação mobile do desafio técnico de autenticação, desenvolvida com **React Native + Expo + TypeScript**.

O aplicativo consome a API REST do projeto `desafio-api` e fornece as telas e o fluxo de autenticação para o usuário.

> **Status atual:** cadastro e login estão implementados; integração de autenticação/sessão está em evolução; recuperação de senha possui tela inicial, mas o fluxo completo ainda está em desenvolvimento.

---

## 📚 Sumário

- [1. Objetivo](#1--objetivo)
- [2. Funcionalidades](#2--funcionalidades)
- [3. Stack](#3--stack)
- [4. Pré-requisitos](#4--pré-requisitos)
- [5. Clonando o projeto](#5--clonando-o-projeto)
- [6. Instalação das dependências](#6--instalação-das-dependências)
- [7. Variáveis de ambiente](#7--variáveis-de-ambiente)
- [8. Configuração da API](#8--configuração-da-api)
- [9. Executando o backend antes do mobile](#9--executando-o-backend-antes-do-mobile)
- [10. Executando o Expo](#10--executando-o-expo)
- [11. Executando em celular físico](#11--executando-em-celular-físico)
- [12. Executando no Android](#12--executando-no-android)
- [13. Executando no iOS](#13--executando-no-ios)
- [14. Executando na Web](#14--executando-na-web)
- [15. Estrutura do projeto](#15--estrutura-do-projeto)
- [16. Navegação](#16--navegação)
- [17. Cadastro](#17--cadastro)
- [18. Login](#18--login)
- [19. JWT e sessão](#19--jwt-e-sessão)
- [20. AuthContext](#20--authcontext)
- [21. Secure Store](#21--secure-store)
- [22. Validação de formulários](#22--validação-de-formulários)
- [23. Tratamento de erros](#23--tratamento-de-erros)
- [24. Recuperação de senha](#24--recuperação-de-senha)
- [25. Testando a aplicação](#25--testando-a-aplicação)
- [26. Problemas comuns](#26--problemas-comuns)
- [27. Status](#27--status)
- [28. Próximos passos](#28--próximos-passos)
- [29. Licença](#29--licença)

---

# 1. 🎯 Objetivo

O aplicativo mobile é o cliente da API de autenticação.

O objetivo é implementar uma experiência de autenticação completa, desde o cadastro até a manutenção da sessão e acesso às áreas protegidas.

O aplicativo é responsável por:

- coletar os dados do usuário;
- validar formulários;
- enviar requisições para a API;
- armazenar o token de autenticação;
- recuperar o usuário autenticado;
- controlar o estado da sessão;
- navegar entre telas públicas e protegidas;
- apresentar mensagens de erro e sucesso.

---

# 2. ✅ Funcionalidades

## Implementadas

- [x] Tela de Login
- [x] Tela de Register
- [x] Tela de Home
- [x] Tela inicial de Forgot Password
- [x] React Hook Form
- [x] Zod no formulário de login
- [x] Validação de cadastro
- [x] Confirmação de senha
- [x] Exibição de erros por campo
- [x] Loading dos botões
- [x] Mensagem de cadastro realizado
- [x] Redirecionamento do cadastro para Login
- [x] Link Login → Register
- [x] Link Login → Forgot Password
- [x] Exibição/ocultação de senha com ícones
- [x] Comunicação com API
- [x] Login consumindo `/auth/login`

## Em desenvolvimento

- [ ] Fluxo completo de persistência da sessão
- [ ] Proteção definitiva das rotas
- [ ] Logout
- [ ] Recuperação de senha
- [ ] Reset de senha
- [ ] Testes finais
- [ ] Centralização da URL da API no `.env`

---

# 3. 🧰 Stack

| Tecnologia | Utilização |
|---|---|
| React Native | Aplicação mobile |
| Expo | Desenvolvimento e execução |
| TypeScript | Tipagem |
| React Navigation | Navegação |
| React Hook Form | Gerenciamento dos formulários |
| Zod | Validação |
| @hookform/resolvers | Integração Zod + React Hook Form |
| Expo Secure Store | Armazenamento seguro do token |

---

# 4. 📋 Pré-requisitos

É necessário possuir:

- Node.js
- npm
- Git
- Expo/CLI fornecido pelo projeto
- Expo Go, se utilizar celular físico

Verifique:

```bash
node --version
npm --version
git --version
```

Para desenvolvimento com dispositivo físico, instale o **Expo Go** no Android ou iOS.

---

# 5. 📥 Clonando o projeto

```bash
git clone <URL_DO_REPOSITORIO>
```

Entre na pasta mobile:

```bash
cd mobile
```

---

# 6. 📦 Instalação das dependências

Execute:

```bash
npm install
```

As principais dependências do aplicativo incluem:

```text
react-native
expo
@react-navigation/native
@react-navigation/native-stack
react-hook-form
zod
@hookform/resolvers
expo-secure-store
```

Caso uma dependência Expo específica precise ser adicionada, prefira:

```bash
npx expo install nome-do-pacote
```

em vez de instalar versões arbitrárias com `npm install`.

---

# 7. 🔐 Variáveis de ambiente

O aplicativo precisa conhecer o endereço da API.

Crie:

```text
.env
```

A partir do exemplo:

## Linux/macOS/Git Bash

```bash
cp .env.example .env
```

## Windows PowerShell

```powershell
Copy-Item .env.example .env
```

## `.env.example`

```env
EXPO_PUBLIC_API_URL=http://YOUR_API_IP:8080
```

Exemplo real de desenvolvimento:

```env
EXPO_PUBLIC_API_URL=http://10.0.0.9:8080
```

> A implementação final deve centralizar a URL da API nessa variável em vez de espalhar o IP diretamente pelos componentes.

---

# 8. 🌐 Configuração da API

O aplicativo depende do backend `desafio-api`.

O backend deve estar funcionando antes dos testes de autenticação.

Exemplo:

```text
API:
http://10.0.0.9:8080
```

A variável do mobile:

```env
EXPO_PUBLIC_API_URL=http://10.0.0.9:8080
```

---

# 9. 🖥️ Executando o backend antes do mobile

Abra um terminal para a API:

```bash
cd desafio-api
npm install
```

Configure o `.env` do backend.

Gere o Prisma Client:

```bash
npx prisma generate
```

Aplique as migrations:

```bash
npx prisma migrate dev
```

Inicie a API:

```bash
npm run dev
```

A API deverá estar disponível na porta `8080`.

Teste:

```bash
curl http://localhost:8080
```

Se o mobile estiver acessando pela rede local, teste também pelo IP:

```bash
curl http://10.0.0.9:8080
```

---

# 10. ▶️ Executando o Expo

No diretório `mobile`:

```bash
npm start
```

ou:

```bash
npx expo start
```

O Expo exibirá as opções de execução e um QR Code.

---

# 11. 📱 Executando em celular físico

Instale o Expo Go no aparelho.

Depois execute:

```bash
npx expo start
```

Escaneie o QR Code.

## API em outro dispositivo

Se o celular estiver acessando uma API em outro dispositivo, **não use `localhost`**.

### ❌ Incorreto

```text
http://localhost:8080
```

### ✅ Correto

```text
http://IP_DO_COMPUTADOR:8080
```

Exemplo:

```text
http://10.0.0.9:8080
```

O computador e o celular precisam conseguir se comunicar pela rede.

---

# 12. 🤖 Executando no Android

Com um emulador Android configurado, execute:

```bash
npx expo start
```

Depois abra no Android.

Se o aplicativo estiver rodando em Android Emulator e precisar acessar o host através de `localhost`, o endereço pode variar conforme a configuração do emulador. No Android Emulator padrão, o host costuma ser acessível por:

```text
http://10.0.2.2:8080
```

Para um aparelho físico, utilize o IP local do computador.

---

# 13. 🍎 Executando no iOS

Em macOS com simulador iOS configurado:

```bash
npx expo start
```

Depois execute no simulador.

No simulador iOS, `localhost` normalmente aponta para o host, mas a configuração deve ser ajustada de acordo com o ambiente.

---

# 14. 🌐 Executando na Web

Execute:

```bash
npx expo start --web
```

Ao executar no navegador, existem diferenças em relação aos módulos nativos.

Por exemplo, `expo-secure-store` possui comportamento dependente de plataforma e deve ser testado no ambiente nativo para validar a persistência segura real.

---

# 15. 📁 Estrutura do projeto

A estrutura pode variar conforme a evolução do projeto, mas a organização atual segue aproximadamente:

```text
mobile/
│
├── src/
│   ├── context/
│   │   └── AuthContext.tsx
│   │
│   ├── screens/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── ForgotPasswordPage.tsx
│   │   └── Home.tsx
│   │
│   ├── schemas/
│   │   └── login.schema.ts
│   │
│   ├── services/
│   │   └── storage.ts
│   │
│   └── types/
│       └── RoutesTypes.ts
│
├── App.tsx
├── .env
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

O diretório de rotas pode estar separado de `src`, dependendo da organização final adotada.

---

# 16. 🧭 Navegação

As rotas utilizam nomes com inicial maiúscula:

```text
Home
Login
Register
ForgotPassword
```

Exemplo:

```ts
navigation.navigate("Register");
```

Fluxo atual:

```text
          ┌─────────────┐
          │    Login    │
          └──────┬──────┘
                 │
       ┌─────────┼─────────┐
       │                   │
       ▼                   ▼
   Register         ForgotPassword
       │                   │
       ▼                   ▼
     Login            ResetPassword
       │
       ▼
      Home
```

---

# 17. 👤 Cadastro

A tela `RegisterPage` possui:

- Name;
- Email;
- Password;
- Confirm password;
- mensagens de validação;
- indicação visual de campo inválido;
- loading;
- mensagem de sucesso;
- navegação para Login.

### Fluxo

```text
Usuário preenche formulário
        ↓
confirma senhas
        ↓
POST /auth/register
        ↓
API
        ↓
Sucesso?
   ┌────┴────┐
   │         │
  Não       Sim
   │         │
   ▼         ▼
Erros     Mensagem
             ↓
           Login
```

---

# 18. 🔑 Login

A `LoginPage` utiliza:

- React Hook Form;
- Zod;
- `loginSchema`;
- `Controller`;
- loading;
- mensagens de erro;
- exibição/ocultação de senha;
- `AuthContext` para o fluxo de login.

O formulário envia:

```json
{
  "email": "admin@gmail.com",
  "password": "Admin123."
}
```

Para:

```text
POST /auth/login
```

### Resposta da API

```json
{
  "token": "JWT_TOKEN"
}
```

---

# 19. 🔐 JWT e sessão

Após o login, o backend retorna um JWT.

Fluxo planejado/implementado:

```text
Login
  ↓
API
  ↓
JWT
  ↓
SecureStore
  ↓
AuthContext
  ↓
/auth/me
  ↓
Usuário autenticado
```

O token deve ser enviado nas requisições protegidas:

```http
Authorization: Bearer <TOKEN>
```

---

# 20. 🧠 AuthContext

O projeto possui `AuthContext.tsx` para centralizar o estado de autenticação.

O contexto é utilizado pelas telas por meio de:

```ts
const { login } = useAuth();
```

A responsabilidade do contexto inclui:

- controlar usuário;
- controlar estado de carregamento;
- iniciar o login;
- recuperar sessão;
- buscar o usuário autenticado;
- permitir que telas diferentes compartilhem o mesmo estado.

---

# 21. 🔒 Secure Store

O projeto utiliza `expo-secure-store` para armazenamento seguro do token em ambiente nativo.

A ideia é encapsular as operações em um serviço, por exemplo:

```text
src/services/storage.ts
```

Responsabilidades:

```text
saveToken()
getToken()
removeToken()
```

> Durante o desenvolvimento foi identificado que `expo-secure-store` não funciona da mesma forma no Expo Web, pois depende de APIs nativas. O teste definitivo de persistência segura deve ser feito no Android/iOS.

---

# 22. 📝 Validação de formulários

O Login utiliza:

```text
React Hook Form
        +
      Zod
```

Exemplo conceitual:

```ts
useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
});
```

As validações são exibidas diretamente nos campos.

---

# 23. ❌ Tratamento de erros

O aplicativo trata erros de validação e erros HTTP.

Exemplo de credencial inválida:

```text
Invalid email or password.
```

Erros de conexão são apresentados como:

```text
Unable to connect to the server.
```

Durante desenvolvimento, erros também podem ser observados no console do Expo/DevTools.

---

# 24. 🔄 Recuperação de senha

A tela `ForgotPasswordPage` já foi criada e estilizada.

A ideia do fluxo é:

```text
Forgot Password
       ↓
Informar e-mail
       ↓
Send recovery code
       ↓
API
       ↓
Código/token
       ↓
ResetPassword
       ↓
Nova senha
       ↓
Login
```

O backend do fluxo de recuperação ainda está em desenvolvimento.

---

# 25. 🧪 Testando a aplicação

## Passo 1 — iniciar API

```bash
cd desafio-api
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

## Passo 2 — configurar mobile

No `.env`:

```env
EXPO_PUBLIC_API_URL=http://10.0.0.9:8080
```

## Passo 3 — iniciar Expo

```bash
cd mobile
npm install
npx expo start
```

## Passo 4 — testar cadastro

Use:

```text
Name: Admin
Email: admin@gmail.com
Password: Admin123.
Confirm password: Admin123.
```

## Passo 5 — testar login

Use:

```text
Email: admin@gmail.com
Password: Admin123.
```

## Passo 6 — verificar autenticação

Após o login, o fluxo deverá obter o usuário autenticado através de:

```text
GET /auth/me
```

---

# 26. 🛠️ Problemas comuns

## API não conecta

Verifique se o backend está rodando:

```bash
npm run dev
```

Na API:

```bash
ss -ltnp | grep 8080
```

Teste:

```bash
curl http://IP_DA_API:8080
```

## Está usando `localhost` no celular

Troque:

```text
http://localhost:8080
```

por:

```text
http://IP_DA_MAQUINA:8080
```

## CORS

Se o frontend/web bloquear a requisição, confirme que a API possui CORS habilitado.

## URL da API hardcoded

Durante o desenvolvimento inicial, a URL foi utilizada diretamente no código. A configuração final deve usar:

```env
EXPO_PUBLIC_API_URL=http://IP_DA_API:8080
```

## `expo-secure-store` não funciona no Web

O Secure Store depende de recursos nativos. Teste a persistência real no Android/iOS/Expo Go.

## Android Emulator não acessa `localhost`

No emulador Android padrão, experimente:

```text
http://10.0.2.2:8080
```

## Erros de navegação

Confirme se os nomes das rotas coincidem exatamente:

```text
Home
Login
Register
ForgotPassword
```

Por exemplo:

```ts
navigation.navigate("Login");
```

não:

```ts
navigation.navigate("login");
```

---

# 27. 📊 Status

## Mobile

- [x] React Native
- [x] Expo
- [x] TypeScript
- [x] React Navigation
- [x] Login
- [x] Register
- [x] Zod
- [x] React Hook Form
- [x] Confirmação de senha
- [x] Mensagens de erro
- [x] Loading
- [x] Exibir/ocultar senha
- [x] Comunicação com API
- [x] Integração do login com API
- [x] Tela Forgot Password
- [ ] Persistência de sessão finalizada para todos os ambientes
- [ ] Proteção definitiva das rotas
- [ ] Logout
- [ ] Reset de senha
- [ ] Fluxo completo de recuperação de senha
- [ ] Testes finais

---

# 28. 🚧 Próximos passos

1. Finalizar a abstração de armazenamento do JWT.
2. Recuperar o usuário autenticado no startup.
3. Proteger as rotas privadas.
4. Implementar logout.
5. Finalizar `/auth/forgot-password`.
6. Criar `ResetPasswordPage`.
7. Implementar `/auth/reset-password`.
8. Centralizar a URL da API usando `.env`.
9. Testar Android/iOS/Web conforme o escopo.
10. Executar o fluxo completo de ponta a ponta.
11. Fazer revisão visual e de código.

---

# 29. 📄 Licença

Projeto desenvolvido para fins de desafio técnico e demonstração de conhecimentos em desenvolvimento mobile, formulários, autenticação, integração com API e gerenciamento de sessão.
