# WebDojo - Cypress Test Automation

Este é o projeto de testes automatizados para a aplicação WebDojo utilizando Cypress.

## 📋 Pré-requisitos

- Node.js
- NPM (Node Package Manager)
- Aplicação WebDojo rodando localmente

## 🚀 Configuração do Ambiente

1. Clone o repositório
```bash
git clone https://github.com/albertmvieira/webdojo.git
```

2. Instale as dependências do projeto
```bash
cd webdojo/web
npm install
```

3. Inicie a aplicação WebDojo
```bash
npm run dev
```
A aplicação estará disponível em http://localhost:3000

## 📦 Estrutura do Projeto

```
web/
├── cypress/
│   ├── downloads/         # Arquivos baixados durante os testes
│   ├── e2e/              # Arquivos de teste
│   │   ├── alerts.cy.js
│   │   ├── cep.cy.js
│   │   ├── consultancy.cy.js
│   │   ├── github.cy.js
│   │   ├── hover.cy.js
│   │   ├── iframe.cy.js
│   │   ├── kanban.cy.js
│   │   ├── links.cy.js
│   │   ├── login.cy.js
│   │   └── studio.cy.js
│   ├── fixtures/         # Arquivos de dados para os testes
│   │   ├── cep.json
│   │   ├── consultancyForm.json
│   │   └── example.json
│   ├── screenshots/      # Screenshots capturados durante os testes
│   ├── support/         # Arquivos de suporte e comandos personalizados
│   │   ├── commands.js
│   │   ├── e2e.js
│   │   └── actions/
│   │       └── consultancy.actions.js
│   └── videos/          # Vídeos gravados durante a execução dos testes
├── cypress.config.js    # Arquivo de configuração do Cypress
└── package.json        # Dependências e scripts do projeto
```

## 🎯 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia a aplicação WebDojo na porta 3000 |
| `npm run test` | Executa todos os testes em modo headless com viewport de 1440x900 |
| `npm run test:ui` | Abre a interface gráfica do Cypress para execução dos testes |
| `npm run test:login` | Executa apenas os testes de login em modo headless |
| `npm run test:mobile` | Executa os testes em viewport mobile (414x896) |

## 🧪 Executando os Testes

### Modo Headless
Para executar todos os testes em modo headless:
```bash
npm run test
```

### Interface Gráfica
Para abrir o Cypress Test Runner:
```bash
npm run test:ui
```

### Testes Específicos
Para executar apenas os testes de login:
```bash
npm run test:login
```

### Testes em Viewport Mobile
Para executar os testes em resolução mobile:
```bash
npm run test:mobile
```

## 📝 Observações Importantes

- A aplicação WebDojo deve estar em execução (`npm run dev`) antes de iniciar os testes
- Os vídeos das execuções dos testes são salvos em `cypress/videos/`
- Screenshots de falhas são salvos em `cypress/screenshots/`
- Dados de teste podem ser encontrados em `cypress/fixtures/`