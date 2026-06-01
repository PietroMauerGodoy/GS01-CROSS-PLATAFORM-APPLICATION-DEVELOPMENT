```markdown
# FIAP Space Control — Central de Monitoramento de Missões Espaciais

Aplicativo mobile desenvolvido em **React Native + Expo** que simula uma central de monitoramento de missões espaciais em tempo real.

---

##  Sobre o Projeto

O **FIAP Space Control** é um app cross-platform que funciona como painel de controle de uma missão espacial real. O usuário pode monitorar sensores da nave, receber alertas automáticos de parâmetros críticos, configurar dados da missão e acompanhar o status em tempo real.

### Funcionalidades

- **Dashboard** com dados de velocidade orbital, energia, comunicação, estabilidade e oxigênio
- **Alertas automáticos** disparados quando parâmetros atingem níveis críticos
- **Tela de sensores** com leitura detalhada e status de cada sistema
- **Formulário de missão** com validação completa de campos
- **Persistência local** de dados com AsyncStorage
- **Gerenciamento de estado global** com Context API
- **Navegação** entre telas com Expo Router

---

##  Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo SDK 56](https://expo.dev/)
- [Expo Router](https://expo.github.io/router/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [Context API](https://react.dev/reference/react/createContext)
- [@expo/vector-icons](https://icons.expo.fyi/)
- TypeScript

---

##  Estrutura do Projeto

```
/app
  ├── _layout.tsx        → Layout raiz com navegação por abas
  ├── index.tsx          → Dashboard principal
  ├── sensors.tsx        → Tela de sensores
  ├── alerts.tsx         → Central de alertas
  └── mission-form.tsx   → Formulário de configuração da missão
/context
  └── MissionContext.tsx → Estado global com Context API
```

---

## 🚀 Como Executar

1. Clone o repositório
```bash
git clone https://github.com/PietroMauerGodoy/GS01-CROSS-PLATAFORM-APPLICATION-DEVELOPMENT.git
```

2. Instale as dependências
```bash
npm install
```

3. Inicie o projeto
```bash
npx expo start
```

4. Escaneie o QR Code com o app **Expo Go** no celular ou pressione **W** para abrir no navegador.

---

##  Equipe de Desenvolvimento

| Nome | RM |
|------|----|
| Patrick Mansour | RM 562970 |
| Pietro Mauer | RM 564345 |
| Samir Assad | RM 561562 |

---

##  Informações Acadêmicas

- **Curso:** Ciência da Computação
- **Disciplina:** Cross-Platform Application Development
- **Instituição:** FIAP
- **Ano:** 2026
```