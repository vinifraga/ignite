## FinAPI - Financeira

---

### Requisitos

- [x] Deve ser possível criar uma conta
- [x] Deve ser possível buscar o extrato bancário do cliente
- [x] Deve ser possível realizar um depósito
- [x] Deve ser possível realizar um saque
- [x] Deve ser possível buscar o extrato bancário do cliente por data
- [ ] Deve ser possível atualizar dados da conta do cliente
- [ ] Deve ser possível obter dados da conta do cliente
- [ ] Deve ser possível deletar uma conta
- [ ] Deve ser possível retornar o balance

---

## Regras de negócio

- [x] Não deve ser possível cadastrar uma conta com CPF já existente
- [x] Não deve ser possível buscar extrato em uma conta não existente
- [x] Não deve ser possível fazer depósito em uma conta não existente
- [x] Não deve ser possível fazer saque em uma conta não existente
- [x] Não deve ser possível fazer saque quando o saldo for insuficiente
- [ ] Não deve ser possível excluir uma conta não existente

# Primeiro projeto com Node.js

## Commits
- **[01: Conhecendo os requisitos da aplicação](https://github.com/vinifraga/ignite/commit/4751f5663ab0e1c052f03abcd3b8ff08edf15042)**
- **[02: Cadastro de conta](https://github.com/vinifraga/ignite/commit/1159c5299f704c39447c9955c9d27b2980cff9d8)**
- **[03: Validando CPF existente](https://github.com/vinifraga/ignite/commit/248cd77006ac777020cb1971e772b84b8158374c)**
- **[04: Listando o extrato](https://github.com/vinifraga/ignite/commit/40ba6a4a7cbd6c7a537488d17ffcddba798cbe1b)**
- **[05: Validando a conta](https://github.com/vinifraga/ignite/commit/64ef835b41da59638c8921b4cfd7a9dbb8ff217b)**
- **[06: Middlewares](https://github.com/vinifraga/ignite/commit/340003b52e59ffd54d39cfb01e3bd87bbaa45187)**
- **[07: Criando depósito na conta](https://github.com/vinifraga/ignite/commit/d823f388b6ddbea1b6d3cff1be3ed35bf90bc8df)**
- **[08: Criando saque na conta](https://github.com/vinifraga/ignite/commit/c442e13b59fa0bcdd534b6d2993a746535146ea5)**
- **[09: Listar extrato bancário por data](https://github.com/vinifraga/ignite/commit/5053da7ce7c7b73ec5d0a9d68ddf4251e98bad9c)**