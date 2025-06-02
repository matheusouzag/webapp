# 📊 Gestor Financeiro Pessoal

Este projeto é uma aplicação web completa para gerenciamento de finanças pessoais, usando **Next.js** no frontend e **Node.js + Express + TypeORM** no backend, permitindo cadastro de contas, registro de transações e transferências entre contas.

---

## 📁 Estrutura de Pastas

```
interface-financas/
├── public/
│   └── images/
├── src/
│   ├── contas/
│   │   ├── page/
│   ├── historico/
│   │   ├── page/
│   ├── interno/
│   │   ├── page/
│   ├── components/
│   │   ├── ContaCard.tsx
│   │   ├── CriarDialog.tsx
│   │   ├── Dashboard.tsx
│   │   ├── DetalhesDialog.tsx
│   │   ├── EditarDialog.tsx
│   │   ├── Footer.tsx
│   │   ├── GastoCard.tsx
│   │   ├── Header.tsx
│   │   ├── TransacaoDialog.tsx
│   │   └── TransferirDialog.tsx
│   ├── dtos/
│   │   ├── Contas.dto.ts
│   │   └── Transacao.dto.ts
│   ├── global.css
│   ├── layout.tsx
│   └── page.tsx
```

---

## 🏗️ Decisões de Arquitetura

- **React JS** → escolha para o frontend por sua componentização e capacidade de construir interfaces ricas e dinâmicas.
- **Tailwind CSS** → usado para estilização rápida, responsiva e consistente, garantindo uma interface moderna e limpa.
- **shadcn/ui** → biblioteca utilizada para os popups e diálogos, garantindo um design bonito e acessível sem necessidade de reinventar componentes.
- **Node.js + Express** → backend leve e rápido, perfeito para aplicações RESTful.
- **TypeORM** → escolhido para mapeamento objeto-relacional por oferecer integração nativa com TypeScript e suporte robusto ao SQLite, facilitando operações no banco relacional.
- **SQLite** → banco de dados simples e leve, sem necessidade de servidor dedicado, ideal para protótipos e aplicações locais.

---

## 🔍 Lógica de Desenvolvimento

### Funcionalidades principais

✅ Cadastro de Contas:
- Nome, tipo (corrente, poupança, crédito, investimento) e saldo inicial.
- Edição e exclusão de contas.

✅ Registro de Transações:
- Tipos: débito, crédito, transferência.
- Informações: valor, descrição opcional, data.
- Ligação com conta de origem/destino.
- Filtros por conta e período.

✅ Transferências:
- Débito automático na conta de origem.
- Crédito automático na conta de destino.
- Validação para evitar saldo negativo.

✅ Validações básicas:
- Inputs obrigatórios verificados.
- Campos numéricos validados.
- Erros claros para o usuário.

✅ Popups e modais:
- Todos feitos com **shadcn/ui**, garantindo visual consistente.

---

## 🏛️ Estrutura do Projeto

### Frontend (`interface-financas/`)
- **public/** → imagens e arquivos públicos.
- **src/contas**, **src/historico**, **src/interno** → páginas do app.
- **src/components/** → todos os componentes reutilizáveis (cards, modais, dialogs, header/footer).
- **src/dtos/** → definição de tipos e contratos de dados.
- **global.css** → estilos globais.
- **layout.tsx** → layout geral.
- **page.tsx** → ponto de entrada principal.

### Backend (em projeto separado)
- **src/controllers/** → lógicas de controle de contas e transações.
- **src/services/** → regras de negócio (ex: transferência entre contas).
- **src/entities/** → modelos TypeORM.
- **src/routes/** → definição de rotas Express.
- **src/database/** → configuração do TypeORM com SQLite.
- **src/tests/** → testes unitários cobrindo serviços e controladores.

---

## ⚙️ Instruções de Execução

### 🔧 Back-end

1. Clone o repositório:
   ```bash
   git clone https://github.com/matheusouzag/webapp-backend.git
   cd webapp-backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   npm run dev
   ```

### 💻 Front-end (Rode o Back-end antes)

1. Clone o repositório:
   ```bash
   git clone https://github.com/matheusouzag/webapp.git
   cd webapp-backend
   ```
2. Vá para a pasta frontend:
   ```bash
   cd webapp
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Inicie o app:
   ```bash
   npm run dev
   ```

---

## 🧪 Cobertura de Testes

- Testes unitários implementados para:
  - Serviços de contas (criação, atualização, remoção).
  - Serviços de transação e transferência.
  - Controladores (validação de entradas, respostas corretas).
- Utilizamos **Jest** para garantir qualidade.
- Testes cobrem cenários de sucesso e falha (ex: transferência com saldo insuficiente).

---

## 🛠️ Tecnologias Utilizadas

| Frontend        | 
|-----------------|
| React JS        | 
| Tailwind CSS    | 
| shadcn/ui       | 
| React Router    | 
| Axios           | 

---
