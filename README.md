# FIAP Space Control

Central de Monitoramento de Missões Espaciais

Aplicativo mobile desenvolvido em React Native + Expo que simula uma central de monitoramento espacial, permitindo acompanhar sensores, alertas críticos e informações da missão em tempo real.

![React Native](https://img.shields.io/badge/React%20Native-Mobile-blue)
![Expo](https://img.shields.io/badge/Expo-SDK%2056-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Status](https://img.shields.io/badge/Status-Concluído-success)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Equipe de Desenvolvimento

| Nome | RM |
|--------|--------|
| Patrick Mansour | RM 562970 |
| Pietro Mauer | RM 564345 |
| Samir Assad | RM 561562 |

---

## Visão Geral

O FIAP Space Control é uma aplicação mobile cross-platform desenvolvida para simular uma central de monitoramento de missões espaciais.

O sistema fornece uma interface intuitiva para monitoramento dos principais indicadores da nave, permitindo acompanhar sensores em tempo real, visualizar alertas críticos e configurar parâmetros da missão.

---

## Objetivos do Projeto

- Simular um ambiente de monitoramento espacial
- Aplicar conceitos de desenvolvimento mobile cross-platform
- Utilizar gerenciamento global de estado
- Implementar persistência local de dados
- Criar uma interface moderna utilizando React Native e Expo

---

## Funcionalidades

### Dashboard

Painel principal contendo:

- Velocidade orbital
- Nível de energia
- Comunicação
- Estabilidade da nave
- Nível de oxigênio

### Monitoramento de Sensores

- Leitura detalhada dos sensores
- Status dos sistemas da nave
- Atualização dinâmica dos dados

### Central de Alertas

- Alertas automáticos
- Identificação de parâmetros críticos
- Exibição de ocorrências importantes

### Configuração da Missão

- Formulário de cadastro
- Validação de campos
- Configuração de parâmetros da missão

### Persistência de Dados

- Armazenamento local utilizando AsyncStorage
- Recuperação automática dos dados salvos

### Gerenciamento de Estado

- Compartilhamento global de informações
- Context API

---

## Tecnologias Utilizadas

| Tecnologia | Finalidade |
|------------|------------|
| React Native | Desenvolvimento Mobile |
| Expo SDK 56 | Ambiente de execução |
| TypeScript | Tipagem estática |
| Expo Router | Navegação entre telas |
| Context API | Gerenciamento de estado |
| AsyncStorage | Persistência local |
| Expo Vector Icons | Componentes visuais |

---

## Estrutura do Projeto

```text
app/
│
├── _layout.tsx
├── index.tsx
├── sensors.tsx
├── alerts.tsx
└── mission-form.tsx
│
context/
│
└── MissionContext.tsx
```

---

## Organização dos Arquivos

| Arquivo | Responsabilidade |
|----------|----------------|
| index.tsx | Dashboard principal |
| sensors.tsx | Monitoramento dos sensores |
| alerts.tsx | Central de alertas |
| mission-form.tsx | Configuração da missão |
| MissionContext.tsx | Gerenciamento global do estado |

---

## Requisitos

Antes de executar o projeto, certifique-se de possuir instalado:

- Node.js
- npm
- Expo CLI
- Expo Go (Android ou iOS)

---

## Instalação

### Clonar o repositório

```bash
git clone https://github.com/PietroMauerGodoy/GS01-CROSS-PLATAFORM-APPLICATION-DEVELOPMENT.git
```

### Acessar a pasta do projeto

```bash
cd GS01-CROSS-PLATAFORM-APPLICATION-DEVELOPMENT
```

### Instalar dependências

```bash
npm install
```

### Executar o projeto

```bash
npx expo start
```

---

## Execução

Após iniciar o projeto:

- Escaneie o QR Code utilizando o aplicativo Expo Go.
- Pressione W para executar no navegador.
- Execute em um emulador Android.
- Execute em um simulador iOS.

---

## Funcionalidades Implementadas

| Recurso | Situação |
|----------|----------|
| Dashboard Espacial | Concluído |
| Sistema de Alertas | Concluído |
| Tela de Sensores | Concluído |
| Formulário da Missão | Concluído |
| Context API | Concluído |
| AsyncStorage | Concluído |
| Navegação com Expo Router | Concluído |
| TypeScript | Concluído |

---

## Informações Acadêmicas

| Campo | Informação |
|---------|---------|
| Instituição | FIAP |
| Curso | Ciência da Computação |
| Disciplina | Cross-Platform Application Development |
| Ano | 2026 |

---

## Licença

Este projeto foi desenvolvido para fins acadêmicos como parte das atividades da disciplina Cross-Platform Application Development da FIAP.
